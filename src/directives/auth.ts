export const auth = {
    mounted(el: any, binding: any) {
        const permString = sessionStorage.getItem('permissions')
        if (permString) {
            const permissions = JSON.parse(permString)
            if (!permissions[binding.value]) {
                el.style.display = 'none'
            }
        }
    },
}
