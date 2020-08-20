<template>
  <div>
    <div class="columns is-multiline mx-0 my-0">
      <soupe-ui-date-picker
        class="column is-6"
        left-label="Normal Date Picker"
        value="2020-08-18"
      ></soupe-ui-date-picker>
      <soupe-ui-date-picker
        class="column is-6"
        left-label="Readonly Date Picker"
        readonly
        value="2020-08-18"
      ></soupe-ui-date-picker>
      <soupe-ui-date-picker
        class="column is-12"
        left-label="Full width Date Picker"
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
