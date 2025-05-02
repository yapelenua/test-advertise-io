<template>
  <div class="w-full h-full overflow-y-hidden bg-stone-950">
    <Header />
    <div class="flex h-full">
      <Sidebar />
      <div class="w-full flex justify-center bg-zink-900 rounded-tl-[32px] overflow-y-auto">
        <router-view />
        <Modals />
      </div>
      <div class="w-[500px] h-full rounded-[32px] p-[32px] flex flex-col">
        <Chat />
        <SuggestionsBlock />
      </div>
    </div>
  </div>
</template>
