import {InjectionKey} from "vue";
import {ActionContext, createStore, Store, useStore as baseUseStore} from "vuex";
import {File, FileState} from "@models/file";


export const editorKey: InjectionKey<Store<FileState>> = Symbol()

export const editor: Store<FileState> = createStore<FileState>({
    state: {
        items: [...Object.keys(localStorage)]
            .filter((key: string) => key.includes('dockerfile'))
            .map((key: string) => JSON.parse(localStorage.getItem(key) || '')).filter((item: File) => item.isOpen),
        files: [...Object.keys(localStorage)]
            .filter((key: string) => key.includes('dockerfile'))
            .map((key: string) => JSON.parse(localStorage.getItem(key) || '')),

    },
    mutations: {
        create(state: FileState, item: File): void {
            state.files.push(item)
            localStorage.setItem(item.name, JSON.stringify(item))
        },

        open(state: FileState, item: File): void {
            item.isOpen = true
            state.items.push(item)
        },

        select(state: FileState, item: File): void {
            state.items.filter((i: File) => i.isSelected).map((i: File) => {
                i.isSelected = false
                localStorage.setItem(i.name, JSON.stringify(i))
            })

            if (item) {
                item.isSelected = true
                localStorage.setItem(item.name, JSON.stringify(item))
                state.items[editor.getters.openFiles.indexOf(item.name)] = item
            }
        },

        close(state: FileState, item: File): void {
            state.items.splice(state.items.indexOf(item), 1)
            item.isOpen = false
            item.isSelected = false
            localStorage.setItem(item.name, JSON.stringify(item))
        },

        update(state: FileState, content: string): void {
            editor.getters.selected.content = content
            localStorage.setItem(editor.getters.selected.name, JSON.stringify(editor.getters.selected))
        },

        delete(state: FileState, item: File): void {
            state.files.splice(state.files.indexOf(item), 1)
            console.log(editor.getters.openFiles.indexOf(item.name))
            state.items.splice(editor.getters.openFiles.indexOf(item.name), 1)
            localStorage.removeItem(item.name)
        }
    },

    actions: {
        open(context: ActionContext<FileState, FileState>, item: File): void {
            if (!context.getters.openFiles.includes(item.name)) {
                context.commit('open', item)
            }

            context.commit('select', item)
        },

        select(context: ActionContext<FileState, FileState>, item: File): void {
                context.commit('select', item)
        },

        close(context: ActionContext<FileState, FileState>, item: File): void {
            context.commit('close', item)
            context.commit('select', context.getters.items[context.getters.items.length - 1])
        },

        update(context: ActionContext<FileState, FileState>, content: string): void {
            context.commit('update', content)
        },

        create(context: ActionContext<FileState, FileState>, item: File): void {
            context.commit('create', item)
            context.commit('open', item)
            context.commit('select', item)
        },

        delete(context: ActionContext<FileState, FileState>, item: File): void {
            context.commit('delete', item)
        }
    },

    getters: {
        items: (state: FileState) => state.items,
        files: (state: FileState) => state.files,
        selected: (state: FileState) => state.items.find((item: File) => item.isSelected),
        openFiles: (state: FileState) => state.items.filter((item: File) => item.isOpen).map((item: File) => item.name)
    },

})

export function useEditorStore(): Store<FileState> {
    return baseUseStore(editorKey)
}