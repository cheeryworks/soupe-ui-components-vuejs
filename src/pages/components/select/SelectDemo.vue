<template>
  <div>
    <soupe-ui-select :options="options"></soupe-ui-select>
    <soupe-ui-select
      leftLabel="第"
      rightLabel="页"
      :options="options"
    ></soupe-ui-select>
  </div>
</template>

<script>
export default {
  name: 'soupe-ui-select-demo',
  data() {
    return {
      options: [
        {
          name: 'A1',
          value: 'A1',
        },
        {
          name: 'A2',
          value: 'A2',
        },
      ],
    }
  },
}
</script>
