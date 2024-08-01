<script lang="ts" setup>
import CreatePermissionComponent from "@components/CreatePermissionComponent.vue";
import CreateRoleComponent from "@components/CreateRoleComponent.vue";
import CreateServiceComponent from "@components/CreateServiceComponent.vue";
import ViewPermissionComponent from "@components/ViewPermissionComponent.vue";
import {apiDelete, apiGet, apiPost, apiPut} from "@/http";
import {GetRolesResponse, GetUsersResponse, StatusResponse} from "@models/response";
import {AxiosResponse} from "axios";
import {ref} from "vue";
import {User} from "@models/user";
import UserCardComponent from "@components/UserCardComponent.vue";
import {ActionType} from "@enums/action";
import ModalComponent from "@components/ModalComponent.vue";
import CreateUserComponent from "@components/CreateUserComponent.vue";
import {NotificationType} from "@enums/notification";
import {useNotificationStore} from "@stores/notification";
import InputComponent from "@components/InputComponent.vue";
import CheckboxComponent from "@components/CheckboxComponent.vue";
import {Role} from "@models/permissions";
import GridComponent from "@components/GridComponent.vue";
import GridCardComponent from "@components/GridCardComponent.vue";

const $notification = useNotificationStore()
const userRoles = ref<number[]>([])
const roles = ref<Role[]>([])
const users = ref<User[]>([])
const user = ref<User>()

const deleteUserModal = ref<boolean>(false)
const updateUserModal = ref<boolean>(false)
const assignRoleModal = ref<boolean>(false)


const getRoles = () => {
  apiGet<GetRolesResponse>('/roles')
      .then((res: AxiosResponse<GetRolesResponse>) => {
        roles.value = res.data.roles
      })
      .catch((err) => {
        console.log(err)
      })
}

const getUsers = () => {
  apiGet<GetUsersResponse>('/users')
      .then((res: AxiosResponse<GetUsersResponse>) => {
        users.value = res.data.users
      })
      .catch((err) => {
        console.log(err)
      })
}

const updateUser = () => {
  if (user.value) {
    apiPut<StatusResponse>(`/user/${user.value.id}`, {
      name: user.value.name,
      email: user.value.email,
    })
        .then((res: AxiosResponse<StatusResponse>) => {
          if (res.data.status === 200) {
            updateUserModal.value = false
            $notification.dispatch(NotificationType.SUCCESS, res.status).then(() => getUsers())
          }
        })
        .catch((err) => {
          console.log(err)
        })
  }
}

const deleteUser = () => {
  if (user.value) {
    apiDelete<StatusResponse>(`/user/${user.value.id}`)
        .then((res: AxiosResponse<StatusResponse>) => {
          if (res.data.status === 200) {
            deleteUserModal.value = false
            $notification.dispatch(NotificationType.SUCCESS, res.status).then(() => getUsers())
          }
        })
        .catch((err) => {
          console.log(err)
        })
  }
}

const assignRoles = () => {
  if (user.value) {
    apiPost<StatusResponse>(`/user/assign`, {
      userId: user.value.id,
      roles: userRoles.value
    })
        .then((res: AxiosResponse) => {
          if (res.data.status === 201) {
            assignRoleModal.value = false
            $notification.dispatch(NotificationType.SUCCESS, res.status).then(() => getUsers())
          }
        })
  }
}

const openDeleteUser = (u: User) => {
  user.value = u
  deleteUserModal.value = true
}

const openUpdateUser = (u: User) => {
  user.value = u
  updateUserModal.value = true
}

const openAssignRole = (u: User) => {
  user.value = u
  assignRoleModal.value = true
}

getUsers()
getRoles()

</script>

<template>

  <GridComponent columns="2">

    <GridCardComponent title="Users">
      <template #action>
        <CreateUserComponent @refresh="getUsers()"/>
      </template>

      <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="user in users" :key="user.id" class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
          <UserCardComponent
              :user="user"
              @delete:user="openDeleteUser"
              @update:user="openUpdateUser"
              @revoke:role="openAssignRole"
          />
        </li>
      </ul>
    </GridCardComponent>

    <GridCardComponent title="Services">
      <template #action>
        <div class="flex gap-4">
          <CreateServiceComponent/>
          <CreateRoleComponent/>
          <CreatePermissionComponent/>
        </div>
      </template>

      <ViewPermissionComponent/>
    </GridCardComponent>

  </GridComponent>


  <!-- Modals -->
  <ModalComponent
      v-if="user"
      title="Delete User"
      :modal="ActionType.DELETE"
      :show="deleteUserModal"
      @close="deleteUserModal = false"
      @submit="deleteUser">

    <p>{{ user.email }}</p>
  </ModalComponent>

  <ModalComponent
      v-if="user"
      title="Update User"
      :modal="ActionType.UPDATE"
      :show="updateUserModal"
      @close="updateUserModal = false"
      @submit="updateUser">

    <InputComponent
        label="Name"
        type="text"
        v-model:value="user.name"/>

    <InputComponent
        label="Name"
        type="email"
        v-model:value="user.email"/>

  </ModalComponent>

  <ModalComponent
      v-if="user"
      title="Role"
      :modal="ActionType.UPDATE"
      :show="assignRoleModal"
      @close="assignRoleModal = false"
      @submit="assignRoles">

    <CheckboxComponent
        name="roles"
        :items="roles"
        :selected="user.roles ? user.roles.map((r) => r.id) : []"
        @change="userRoles = $event"
    />

  </ModalComponent>


</template>