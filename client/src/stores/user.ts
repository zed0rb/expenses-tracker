// src/stores/user.ts

import {
  clearStoredAccessToken,
  getStoredAccessToken,
  getUserIdFromToken,
  storeAccessToken,
} from '@/utils/auth'
import { trpc } from '@/trpc'
import { computed, ref } from 'vue'

const authToken = ref(getStoredAccessToken(localStorage))

export const authUserId = computed(() =>
  authToken.value ? getUserIdFromToken(authToken.value) : null
)

export const isLoggedIn = computed(() => !!authToken.value)

// Exported API procedures.
/**
 * Log in a user and store the access token in the store and in the local storage.
 */
export async function login(userLogin: { email: string; password: string }) {
  // login might not be considered a mutation, but we are considering it as such
  // given that it creates a new "thing" - an access token.
  const { accessToken } = await trpc.user.login.mutate(userLogin)

  authToken.value = accessToken
  storeAccessToken(localStorage, accessToken)
}

export function logout() {
  authToken.value = null
  clearStoredAccessToken(localStorage)
}

export const signup = trpc.user.signup.mutate
