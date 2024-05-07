<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { FwbNavbar, FwbNavbarCollapse, FwbNavbarLink } from 'flowbite-vue'

const { links } = defineProps<{
  links: {
    label: string
    name: string
  }[]
}>()

const route = useRoute()

const navigation = computed(() =>
  links.map((item) => ({
    ...item,
    isActive: route.name === item.name,
  }))
)
</script>

<template>
  <div class="relative">
    <!-- Sticky Navbar -->
    <FwbNavbar class="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
      <template #default="{ isShowMenu }">
        <FwbNavbar-collapse :isShowMenu="isShowMenu">
          <!-- Navigation links -->
          <FwbNavbarLink
            v-for="link in navigation"
            :key="link.name"
            :is-active="link.isActive"
            :link="({ name: link.name } as any)"
            link-attr="to"
            component="RouterLink"
          >
            {{ link.label }}
          </FwbNavbarLink>
          <slot name="menu" />
        </FwbNavbar-collapse>
      </template>
    </FwbNavbar>

    <main>
      <div class="container mx-auto px-6 py-8">
        <RouterView />
      </div>
    </main>
  </div>
</template>

