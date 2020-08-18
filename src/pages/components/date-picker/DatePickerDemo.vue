<template>
  <div>
    <div class="columns is-multiline mx-0 my-0">
      <soupe-ui-date-picker
        left-label="Normal Date Picker"
        class="column is-6"
        value="2020-08-18"
      ></soupe-ui-date-picker>
      <soupe-ui-date-picker
        left-label="Readonly Date Picker"
        class="column is-6"
        value="2020-08-18"
        readonly
      ></soupe-ui-date-picker>
      <soupe-ui-date-picker
        left-label="Full width Date Picker"
        class="column is-12"
        value="2020-08-18"
      ></soupe-ui-date-picker>
      <soupe-ui-date-picker
        class="column is-6"
        left-label="Start Date"
        value="2019-08-18"
      ></soupe-ui-date-picker>
      <soupe-ui-date-picker
        class="column is-6"
        left-label="End Date"
        value="2020-08-18"
      ></soupe-ui-date-picker>
    </div>
  </div>
</template>
