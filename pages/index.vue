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
            'Подбери себе студию по любым параметрам, используя удобные фильтры и подробную информацию.',
        },
      ],
    }
  },
}
</script>
