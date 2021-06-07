<template>
  <div />
</template>

<script>
export default {
  name: 'Main',
  middleware: 'redirect-to-spb',
  head() {
    return {
      title: `Каталог вебкам-студий`,
      meta: [
        {
          description:
            'Подбери себе вебкам студию для заработка по любым параметрам, используя удобные фильтры и подробную информацию.',
        },
      ],
    }
  },
}
</script>
