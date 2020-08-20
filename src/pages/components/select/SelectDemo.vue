<template>
  <div>
    <div class="field">
      <label class="label">Default Select</label>
      <soupe-ui-select :options="options"></soupe-ui-select>
    </div>
    <div class="field">
      <label class="label">Select with customized labels</label>
      <soupe-ui-select
        :left-label="
          $t('soupe.ui.components.table.pagination_pages', {
            currentPage: table.page,
            totalPage: table.totalPage > 0 ? table.totalPage : 1
          }) +
            $t(
              'soupe.ui.components.table.pagination_page_sizes_left_bottom_label'
            )
        "
        :options="table.pageSizes"
        :right-label="
          $t('soupe.ui.components.table.pagination_page_sizes_right_label')
        "
      ></soupe-ui-select>
    </div>
    <div class="field">
      <label class="label">Readonly Select</label>
      <soupe-ui-select :options="options" readonly></soupe-ui-select>
    </div>
    <div class="field">
      <label class="label">100% width Select</label>
      <soupe-ui-select :options="options" width="100%"></soupe-ui-select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'soupe-ui-select-demo',
  data() {
    return {
      options: [
        {
          id: 'A1',
          name: 'A1'
        },
        {
          id: 'A2',
          name: 'A2'
        }
      ],
      table: {
        totalPage: 2,
        page: 1,
        pageSizes: [20, 50, 100]
      }
    }
  }
}
</script>
