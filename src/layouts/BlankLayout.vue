<template>
  <div class="w-full h-full overflow-y-hidden bg-stone-950">
    <Header />
    <div class="flex h-full">
      <Sidebar />
      <div class="w-full flex justify-center bg-zink-900 rounded-tl-[32px]">
        <router-view />
        <Modals />
      </div>
    </div>
  </div>
</template>
