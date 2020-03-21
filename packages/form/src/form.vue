<template>
  <div>
    <form>
      <slot></slot>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LvForm',
  provide(){
    return {
      LvForm: this
    }
  },
  props: {
    rules: Object,
    model: Object
  },
}
</script>
<style lang="scss" scoped>
</style>