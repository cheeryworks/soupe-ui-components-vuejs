<template>
  <div class="hero">
    <div
      :class="{
        'hero-body': !autoHeight,
        'px-0 py-0': !autoHeight,
        'soupe-ui-table-border': border,
        'soupe-ui-table-fixed': isFixed,
        'soupe-ui-table-header-centralized': headerCenter
      }"
      class="soupe-ui-table hero"
    >
      <div class="hero-head pagination-top">
        <div class="columns is-gapless is-vcentered mx-0 my-0 mb-2"
          v-if="(paging && !pageSizeInBottom) || hasOperations">
          <div class="column is-narrow" v-if="paging && !pageSizeInBottom">
            <soupe-ui-select
              :left-label="$t('soupe.ui.components.table.pagination_page_sizes_left_label')"
              :options="pageSizes"
              :right-label="$t('soupe.ui.components.table.pagination_page_sizes_right_label')"
              :value="size"
              @item-selected="changePageSize"
            />
          </div>
          <div class="column" v-if="hasOperations">
            <div class="operations has-text-right">
              <slot name="operations"></slot>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-body px-0 py-0 soupe-ui-table-content hero">
        <div
          class="hero-head soupe-ui-table-header columns is-gapless mx-0 my-0 has-background-primary"
        >
          <div
            class="column is-narrow soupe-ui-table-header-left columns is-gapless mx-0 my-0 overflow-hidden"
            v-if="hasLeftFixedColumns"
          >
            <table class="column table">
              <colgroup
                v-if="
                  selectionConfigs &&
                    selectionConfigs.multipleSelect &&
                    fixedLeftColumns >= 1
                "
              >
                <col class="soupe-ui-table-checkbox-column"/>
              </colgroup>
              <colgroup :key="i" v-for="(column, i) in columnsInLeftBody">
                <col :style="{ width: column.width + 'px' }"/>
              </colgroup>
              <thead>
              <tr :key="i" v-for="(rowInHeader, i) in rowsInLeftHeader">
                <th
                  :rowspan="rowsInLeftHeader.length"
                  class="soupe-ui-table-checkbox-column"
                  v-if="
                      selectionConfigs &&
                        selectionConfigs.multipleSelect &&
                        fixedLeftColumns >= 1 &&
                        i === 0
                    "
                >
                  <table-header-cell>
                    <input
                      :checked="checkedAll"
                      @click="internalCheckingAll($event)"
                      type="checkbox"
                      v-if="selectionConfigs.selectAll"
                    />
                  </table-header-cell>
                </th>
                <th
                  :class="[
                      columnInHeader.classes,
                      {
                        'soupe-ui-table-no-right-border': isLastColumnInRow(
                          rowInHeader,
                          i,
                          j,
                          columnsInLeftBody.length
                        )
                      }
                    ]"
                  :colspan="columnInHeader.colSpan"
                  :key="j"
                  :rowspan="columnInHeader.rowSpan"
                  v-for="(columnInHeader, j) in rowInHeader"
                >
                  <table-header-cell>
                    {{
                      columnInHeader.title ? columnInHeader.title : '&nbsp;'
                    }}
                  </table-header-cell>
                </th>
                <th>X</th>
              </tr>
              </thead>
            </table>
          </div>
          <div
            class="column soupe-ui-table-header-center columns is-gapless mx-0 my-0 overflow-x-hidden"
          >
            <table class="column table">
              <colgroup
                v-if="
                  selectionConfigs &&
                    selectionConfigs.multipleSelect &&
                    fixedLeftColumns < 1
                "
              >
                <col class="soupe-ui-table-checkbox-column"/>
              </colgroup>
              <colgroup :key="i" v-for="(column, i) in columnsInCenterBody">
                <col
                  :style="{
                    width: column.width
                      ? column.width + 'px'
                      : autoColumnWidth + 'px'
                  }"
                />
              </colgroup>
              <colgroup v-if="bodyScrollableV">
                <col style="width: 100px;"/>
              </colgroup>
              <thead>
              <tr :key="i" v-for="(rowInHeader, i) in rowsInCenterHeader">
                <th
                  :rowspan="rowsInCenterHeader.length"
                  class="soupe-ui-table-checkbox-column"
                  v-if="
                      selectionConfigs &&
                        selectionConfigs.multipleSelect &&
                        fixedLeftColumns < 1
                    "
                >
                  <table-header-cell>
                    <input
                      :checked="checkedAll"
                      @click="internalCheckingAll($event)"
                      type="checkbox"
                      v-if="selectionConfigs.selectAll"
                    />
                  </table-header-cell>
                </th>
                <th
                  :class="[
                      columnInHeader.classes,
                      {
                        'soupe-ui-table-no-right-border': isLastColumnInRow(
                          rowInHeader,
                          i,
                          j,
                          columnsInCenterBody.length
                        ),
                        'soupe-ui-table-header-no-right-border': isLastColumnInRow(
                          rowInHeader,
                          i,
                          j,
                          columnsInCenterBody.length
                        )
                      }
                    ]"
                  :colspan="columnInHeader.colSpan"
                  :key="j"
                  :rowspan="columnInHeader.rowSpan"
                  v-for="(columnInHeader, j) in rowInHeader"
                >
                  <table-header-cell>
                    {{
                      columnInHeader.title ? columnInHeader.title : '&nbsp;'
                    }}
                  </table-header-cell>
                </th>
                <th style="text-overflow: clip;" v-if="bodyScrollableV">
                  &nbsp;
                </th>
              </tr>
              </thead>
            </table>
          </div>
          <div
            class="column is-narrow soupe-ui-table-header-right columns is-gapless mx-0 my-0"
            v-if="hasRightFixedColumns"
          >
            <table class="column table is-striped">
              <colgroup :key="i" v-for="(column, i) in columnsInRightBody">
                <col :style="{ width: column.width + 'px' }"/>
              </colgroup>
              <thead>
              <tr :key="i" v-for="(rowInHeader, i) in rowsInRightHeader">
                <th
                  :class="[
                      columnInHeader.classes,
                      {
                        'soupe-ui-table-no-right-border': isLastColumnInRow(
                          rowInHeader,
                          i,
                          j,
                          columnsInRightBody.length
                        )
                      }
                    ]"
                  :colspan="columnInHeader.colSpan"
                  :key="j"
                  :rowspan="columnInHeader.rowSpan"
                  v-for="(columnInHeader, j) in rowInHeader"
                >
                  <table-header-cell>
                    {{
                      columnInHeader.title ? columnInHeader.title : '&nbsp;'
                    }}
                  </table-header-cell>
                </th>
                <th>X</th>
              </tr>
              </thead>
            </table>
          </div>
        </div>
        <div
          class="hero-body px-0 py-0 soupe-ui-table-body columns is-gapless mx-0 my-0"
        >
          <div
            class="column is-narrow soupe-ui-table-body-left columns is-gapless overflow-y-hidden mx-0 my-0"
            v-if="hasLeftFixedColumns"
          >
            <table
              :class="{ 'soupe-ui-table-scroll': !bodyScrollableV }"
              class="column table is-striped"
            >
              <colgroup
                v-if="
                  selectionConfigs &&
                    selectionConfigs.multipleSelect &&
                    fixedLeftColumns >= 1
                "
              >
                <col class="soupe-ui-table-checkbox-column"/>
              </colgroup>
              <colgroup :key="i" v-for="(column, i) in columnsInLeftBody">
                <col :style="{ width: column.width + 'px' }"/>
              </colgroup>
              <tbody>
              <tr :key="i" v-for="(record, i) in records">
                <td
                  class="soupe-ui-table-checkbox-column"
                  v-if="
                      selectionConfigs &&
                        selectionConfigs.multipleSelect &&
                        fixedLeftColumns >= 1
                    "
                >
                  <input
                    :checked="isChecked(record)"
                    @click.stop="onCheck($event, record)"
                    type="checkbox"
                  />
                </td>
                <template v-for="(column, j) in columnsInLeftBody">
                  <template v-if="column.slot">
                    <slot
                      :column="column"
                      :columnIndex="j"
                      :name="column.slot"
                      :record="record"
                      :rowIndex="i"
                    />
                  </template>
                  <template v-else>
                    <td
                      :class="[
                          column.classes,
                          {
                            'soupe-ui-table-no-right-border': isLastColumnInRow(
                              columnsInLeftBody,
                              i,
                              j,
                              columnsInLeftBody.length
                            )
                          }
                        ]"
                      :key="j"
                      v-html="column.renderer(i, j, column, record)"
                      v-if="column.renderer"
                    ></td>
                    <td
                      :class="[
                          column.classes,
                          {
                            'soupe-ui-table-no-right-border': isLastColumnInRow(
                              columnsInLeftBody,
                              i,
                              j,
                              columnsInLeftBody.length
                            )
                          }
                        ]"
                      :key="j"
                      v-else
                    >
                      {{
                        record[column.name] ? record[column.name] : '&nbsp;'
                      }}
                    </td>
                  </template>
                </template>
              </tr>
              <tr v-if="bodyScrollableV">
                <td
                  :colspan="
                      selectionConfigs && selectionConfigs.multipleSelect
                        ? columnsInLeftBody.length + 1
                        : columnsInLeftBody.length
                    "
                  class="soupe-ui-table-colspan"
                ></td>
              </tr>
              </tbody>
            </table>
          </div>
          <div
            class="column soupe-ui-table-body-center overflow-x-auto overflow-y-auto columns is-gapless mx-0 my-0"
          >
            <table
              :class="{ 'soupe-ui-table-scroll': !bodyScrollableV }"
              class="column table is-striped"
            >
              <colgroup
                v-if="
                  selectionConfigs &&
                    selectionConfigs.multipleSelect &&
                    fixedLeftColumns < 1
                "
              >
                <col class="soupe-ui-table-checkbox-column"/>
              </colgroup>
              <colgroup :key="i" v-for="(column, i) in columnsInCenterBody">
                <col
                  :style="{
                    width: column.width
                      ? column.width + 'px'
                      : autoColumnWidth + 'px'
                  }"
                />
              </colgroup>
              <tbody>
              <tr :key="i" v-for="(record, i) in records">
                <td
                  class="soupe-ui-table-checkbox-column"
                  v-if="
                      selectionConfigs &&
                        selectionConfigs.multipleSelect &&
                        fixedLeftColumns < 1
                    "
                >
                  <input
                    :checked="isChecked(record)"
                    @click.stop="onCheck($event, record)"
                    type="checkbox"
                  />
                </td>
                <template v-for="(column, j) in columnsInCenterBody">
                  <template v-if="column.slot">
                    <slot
                      :column="column"
                      :columnIndex="j"
                      :name="column.slot"
                      :record="record"
                      :rowIndex="i"
                    />
                  </template>
                  <template v-else>
                    <td
                      :class="[
                          column.classes,
                          {
                            'soupe-ui-table-no-right-border': isLastColumnInRow(
                              columnsInCenterBody,
                              i,
                              j,
                              columnsInCenterBody.length
                            )
                          }
                        ]"
                      :key="j"
                      v-html="column.renderer(i, j, column, record)"
                      v-if="column.renderer"
                    ></td>
                    <td
                      :class="[
                          column.classes,
                          {
                            'soupe-ui-table-no-right-border': isLastColumnInRow(
                              columnsInCenterBody,
                              i,
                              j,
                              columnsInCenterBody.length
                            )
                          }
                        ]"
                      :key="j"
                      v-else
                    >
                      {{
                        record[column.name] ? record[column.name] : '&nbsp;'
                      }}
                    </td>
                  </template>
                </template>
              </tr>
              <tr v-if="!records || (records.length === 0 && emptyMessage)">
                <td
                  :colspan="columnsInCenterBody.length"
                  class="text-center"
                  v-html="emptyMessage"
                ></td>
              </tr>
              </tbody>
            </table>
          </div>
          <div
            class="column is-narrow soupe-ui-table-body-right overflow-y-hidden columns is-gapless mx-0 my-0"
            v-if="hasRightFixedColumns"
          >
            <table
              :class="{ 'soupe-ui-table-scroll': !bodyScrollableV }"
              class="column table is-striped"
            >
              <colgroup
                :key="index"
                v-for="(column, index) in columnsInRightBody"
              >
                <col :style="{ width: column.width + 'px' }"/>
              </colgroup>
              <tbody>
              <tr :key="i" v-for="(record, i) in records">
                <template v-for="(column, j) in columnsInRightBody">
                  <template v-if="column.slot">
                    <slot
                      :column="column"
                      :columnIndex="j"
                      :name="column.slot"
                      :record="record"
                      :rowIndex="i"
                    />
                  </template>
                  <template v-else>
                    <td
                      :class="[
                          column.classes,
                          {
                            'soupe-ui-table-no-right-border': isLastColumnInRow(
                              columnsInRightBody,
                              i,
                              j,
                              columnsInRightBody.length
                            )
                          }
                        ]"
                      :key="j"
                      v-html="column.renderer(i, j, column, record)"
                      v-if="column.renderer"
                    ></td>
                    <td
                      :class="[
                          column.classes,
                          {
                            'soupe-ui-table-no-right-border': isLastColumnInRow(
                              columnsInRightBody,
                              i,
                              j,
                              columnsInRightBody.length
                            )
                          }
                        ]"
                      :key="j"
                      v-else
                    >
                      {{
                        record[column.name] ? record[column.name] : '&nbsp;'
                      }}
                    </td>
                  </template>
                </template>
              </tr>
              <tr v-if="bodyScrollableV">
                <td
                  :colspan="columnsInRightBody.length"
                  class="soupe-ui-table-colspan"
                ></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div
          class="hero-foot soupe-ui-table-footer columns is-gapless"
          v-if="footer && footer.length > 0"
        >
          <div
            class="column is-narrow soupe-ui-table-footer-left"
            v-if="hasLeftFixedColumns"
          >
            LF
          </div>
          <div class="column soupe-ui-table-footer-center">CF</div>
          <div
            class="column is-narrow soupe-ui-table-footer-right"
            v-if="hasRightFixedColumns"
          >
            RF
          </div>
        </div>
      </div>
      <div
        class="hero-foot columns pagination-bottom is-gapless is-vcentered mx-0 my-0 mt-2"
        v-show="paging"
      >
        <div class="column">
          <div class="pagination-bar">
            {{
              $t('soupe.ui.components.table.pagination_records', {
                startNumber: startNumber,
                endNumber: endNumber,
                total: total
              })
            }}
          </div>
        </div>
        <div class="column is-narrow">
          <div
            class="has-text-right pagination-bar columns is-gapless is-vcentered mx-0 my-0"
          >
            <div class="column is-narrow">
              {{
                $t('soupe.ui.components.table.pagination_pages', {
                  currentPage: page,
                  totalPage: totalPage > 0 ? totalPage : 1
                })
              }}
            </div>
            <div class="column is-narrow" v-if="pageSizeInBottom">
              <soupe-ui-select
                :left-label="$t('soupe.ui.components.table.pagination_page_sizes_left_bottom_label')"
                :options="pageSizes"
                :right-label="$t('soupe.ui.components.table.pagination_page_sizes_right_label')"
                :value="size"
                @item-selected="changePageSize"
              />
            </div>
            <div class="column is-narrow">
              <button
                :class="{ disabled: page === 1 }"
                @click="prevPage()"
                class="button hollow soupe-ui-table-pagination-button is-primary"
              >
                <span class="icon">
                  <i class="fas fa-caret-left"></i>
                </span>
              </button>
            </div>
            <div class="column is-narrow">
              <button
                :class="{ disabled: page === totalPage || totalPage === 0 }"
                @click="nextPage()"
                class="button hollow soupe-ui-table-pagination-button is-primary"
              >
                <span class="icon">
                  <i class="fas fa-caret-right"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableHeaderCell from './TableHeaderCell'

export default {
  name: 'soupe-ui-table',
  components: {
    TableHeaderCell
  },
  props: {
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    fixedLeftColumns: {
      type: Number,
      default() {
        return 0
      }
    },
    fixedRightColumns: {
      type: Number,
      default() {
        return 0
      }
    },
    border: {
      type: Boolean,
      default() {
        return true
      }
    },
    autoHeight: {
      type: Boolean,
      default() {
        return false
      }
    },
    headerCenter: {
      type: Boolean,
      default() {
        return true
      }
    },
    footer: {
      type: Array,
      default() {
        return []
      }
    },
    records: {
      type: Array,
      default() {
        return []
      }
    },
    paging: {
      type: Boolean,
      default() {
        return false
      }
    },
    pageSizeInBottom: {
      type: Boolean,
      default() {
        return false
      }
    },
    total: {
      type: Number,
      default() {
        return 0
      }
    },
    totalPage: {
      type: Number,
      default() {
        return 1
      }
    },
    page: {
      type: Number,
      default() {
        return 1
      }
    },
    size: {
      type: Number,
      default() {
        return 20
      }
    },
    selectionConfigs: {
      type: Object,
      default() {
        return {
          selectAll: false,
          multipleSelect: false,
          isChecked(record) {
            return record.checked
          },
          checkingAll(checked, records) {
            for (let record of records) {
              record.checked = checked
            }
          }
        }
      }
    },
    emptyMessage: {
      default() {
        return null
      }
    }
  },
  data() {
    return {
      bodyScrollLeft: 0,
      bodyScrollTop: 0,
      bodyScrollableV: false,
      columnsWidth: 0,
      autoColumns: 0,
      widthOfBodyCenter: 0,
      pageSizes: [20, 50, 100]
    }
  },
  watch: {
    bodyScrollLeft() {
      if (this.$el.querySelector('.soupe-ui-table-header-center')) {
        this.$el.querySelector(
          '.soupe-ui-table-header-center'
        ).scrollLeft = this.bodyScrollLeft
      }

      if (this.$el.querySelector('.soupe-ui-table-header-footer')) {
        this.$el.querySelector(
          '.soupe-ui-table-header-footer'
        ).scrollLeft = this.bodyScrollLeft
      }
    },
    bodyScrollTop() {
      if (this.$el.querySelector('.soupe-ui-table-body-left')) {
        this.$el.querySelector(
          '.soupe-ui-table-body-left'
        ).scrollTop = this.bodyScrollTop
      }

      if (this.$el.querySelector('.soupe-ui-table-body-right')) {
        this.$el.querySelector(
          '.soupe-ui-table-body-right'
        ).scrollTop = this.bodyScrollTop
      }
    },
    'selectionConfigs.multipleSelect': function() {
      this.$emit('page-changed', 1, this.size)
    }
  },
  computed: {
    hasLeftFixedColumns() {
      return this.fixedLeftColumns && this.fixedLeftColumns > 0
    },
    hasRightFixedColumns() {
      return this.fixedRightColumns && this.fixedRightColumns > 0
    },
    rowsInLeftHeader() {
      if (this.columns && this.columns.length > 0) {
        let start = 0
        let end = this.fixedLeftColumns ? this.fixedLeftColumns - 1 : 0

        return this.getRowsInHeader(start, end)
      } else {
        return []
      }
    },
    rowsInCenterHeader() {
      if (this.columns && this.columns.length > 0) {
        let start = this.fixedLeftColumns ? this.fixedLeftColumns : 0
        let end = this.fixedRightColumns
          ? this.columns.length - this.fixedRightColumns - 1
          : this.columns.length - 1

        return this.getRowsInHeader(start, end)
      } else {
        return []
      }
    },
    rowsInRightHeader() {
      if (this.columns && this.columns.length > 0) {
        let start = this.fixedRightColumns
          ? this.columns.length - this.fixedRightColumns
          : this.columns.length - 1
        let end = this.columns.length - 1

        return this.getRowsInHeader(start, end)
      } else {
        return []
      }
    },
    columnsInLeftBody() {
      if (this.columns && this.columns.length > 0) {
        let start = 0
        let end = this.fixedLeftColumns ? this.fixedLeftColumns - 1 : 0

        return this.getColumnsInBody(start, end, this.columns)
      } else {
        return []
      }
    },
    columnsInCenterBody() {
      if (this.columns && this.columns.length > 0) {
        let start = this.fixedLeftColumns ? this.fixedLeftColumns : 0
        let end = this.fixedRightColumns
          ? this.columns.length - this.fixedRightColumns - 1
          : this.columns.length - 1

        return this.getColumnsInBody(start, end, this.columns)
      } else {
        return []
      }
    },
    columnsInRightBody() {
      if (this.columns && this.columns.length > 0) {
        let start = this.fixedRightColumns
          ? this.columns.length - this.fixedRightColumns
          : this.columns.length - 1
        let end = this.columns.length - 1

        return this.getColumnsInBody(start, end, this.columns)
      } else {
        return []
      }
    },
    autoColumnWidth() {
      if (
        this.widthOfBodyCenter - this.columnsWidth >
        this.autoColumns * 100
      ) {
        let totalRemainWidth = this.widthOfBodyCenter - this.columnsWidth

        if (this.selectionConfigs && this.selectionConfigs.multipleSelect) {
          totalRemainWidth = totalRemainWidth - 40
        }

        if (!this.bodyScrollableV && this.isWindows) {
          totalRemainWidth = totalRemainWidth - 1
        }

        return totalRemainWidth / this.autoColumns
      }

      return 100
    },
    startNumber() {
      if (this.total && this.total > 0) {
        return (this.page - 1) * this.size + 1
      } else {
        return 1
      }
    },
    endNumber() {
      if (this.page === this.totalPage) {
        return this.total
      } else {
        return this.page * this.size
      }
    },
    checkedAll() {
      if (this.selectionConfigs && this.records && this.records.length > 0) {
        for (let record of this.records) {
          if (!this.isChecked(record)) {
            return false
          }
        }

        return true
      } else {
        return false
      }
    },
    hasOperations() {
      return !!this.$slots['operations']
    },
    isFixed() {
      return (
        !this.autoHeight &&
        ((this.fixedLeftColumns && this.fixedLeftColumns > 0) ||
          (this.fixedRightColumns && this.fixedRightColumns > 0))
      )
    },
    isWindows() {
      return navigator.platform.indexOf('Win') > -1
    }
  },
  mounted() {
    let self = this

    self.$el
      .querySelector('.soupe-ui-table-body-center')
      .addEventListener('scroll', function(event) {
        self.bodyScrollLeft = event.target.scrollLeft
        self.bodyScrollTop = event.target.scrollTop
      })

    self.updateLayout()

    window.addEventListener('resize', function() {
      self.updateLayout()
    })

    this.setAutoWidthOfColumn()
  },
  updated() {
    let self = this

    this.$nextTick(() => {
      self.updateLayout()
    })
  },
  methods: {
    getColumnsInBody(start, end, columns) {
      let columnsInCenter = []
      if (start >= 0 && end >= 0 && columns && columns.length >= 1) {
        for (let i = start; i <= end; i++) {
          if (columns[i].columns && columns[i].columns.length > 0) {
            let childColumnsInCenter = this.getColumnsInBody(
              0,
              columns[i].columns.length - 1,
              columns[i].columns
            )

            if (childColumnsInCenter && childColumnsInCenter.length > 0) {
              for (let childColumnInCenter of childColumnsInCenter) {
                columnsInCenter.push(childColumnInCenter)
              }
            }
          } else {
            columnsInCenter.push(columns[i])
          }
        }
      }

      return columnsInCenter
    },
    getRowsInHeader(start, end) {
      let maxDepthOfHeader = this.getMaxDepthOfHeader(this.columns)

      let rows = []

      for (let i = 0; i < maxDepthOfHeader; i++) {
        rows.push([])
      }

      this.internalGetRowsInHeader(
        start,
        end,
        rows,
        this.columns,
        1,
        maxDepthOfHeader
      )

      return rows
    },
    internalGetRowsInHeader(start, end, rows, columns, depth, maxDepth) {
      if (start >= 0 && end >= 0 && columns && columns.length >= 1) {
        for (let i = start; i <= end; i++) {
          let rowSpan =
            maxDepth -
            depth -
            this.getMaxDepthOfHeader(columns[i].columns) +
            1
          let colSpan = this.getMaxWidthOfHeader(columns[i].columns)

          rows[depth - 1].push({
            title: columns[i].title,
            width: columns[i].width,
            classes: columns[i].classes,
            rowSpan: rowSpan,
            colSpan: colSpan
          })

          if (columns[i].columns && columns[i].columns.length > 0) {
            this.internalGetRowsInHeader(
              0,
              columns[i].columns.length - 1,
              rows,
              columns[i].columns,
              depth + 1 + rowSpan - 1,
              maxDepth
            )
          }
        }
      }
    },
    getMaxDepthOfHeader(columns) {
      let maxDepth = 0

      if (columns && columns.length > 0) {
        let depths = []
        for (let column of columns) {
          let depth = 1

          if (column.columns && column.columns.length > 0) {
            depth += this.getMaxDepthOfHeader(column.columns)
          }

          depths.push(depth)
        }

        for (let currentDepth of depths) {
          if (currentDepth > maxDepth) {
            maxDepth = currentDepth
          }
        }
      }

      return maxDepth
    },
    getMaxWidthOfHeader(columns) {
      let maxWidth = 1

      if (columns && columns.length > 0) {
        maxWidth = columns.length

        let columnWidths = []

        for (let column of columns) {
          columnWidths.push(this.getMaxWidthOfHeader(column.columns))
        }

        let currentWidth = 0

        for (let columnWidth of columnWidths) {
          currentWidth += columnWidth
        }

        if (currentWidth > maxWidth) {
          maxWidth = currentWidth
        }
      }

      return maxWidth
    },
    setAutoWidthOfColumn() {
      if (this.columns && this.columns.length > 0) {
        let start = this.fixedLeftColumns ? this.fixedLeftColumns : 0
        let end = this.fixedRightColumns
          ? this.columns.length - this.fixedRightColumns - 1
          : this.columns.length - 1

        let widthAndAutoColumns = this.getWidthOfColumns(
          start,
          end,
          this.columns
        )

        this.columnsWidth = widthAndAutoColumns.width
        this.autoColumns = widthAndAutoColumns.columns
      }
    },
    getWidthOfColumns(start, end, columns) {
      let widthAndAutoColumns = {
        width: 0,
        columns: 0
      }

      if (start >= 0 && end >= 0 && columns && columns.length >= 1) {
        for (let i = start; i <= end; i++) {
          if (columns[i].columns && columns[i].columns.length > 0) {
            let currentWidthAndAutoColumns = this.getWidthOfColumns(
              0,
              columns[i].columns.length - 1,
              columns[i].columns
            )

            widthAndAutoColumns.width += currentWidthAndAutoColumns.width
            widthAndAutoColumns.columns += currentWidthAndAutoColumns.columns
          } else if (columns[i].width) {
            widthAndAutoColumns.width += columns[i].width
          } else {
            widthAndAutoColumns.columns += 1
          }
        }
      }

      return widthAndAutoColumns
    },
    isLastColumnInRow(columns, rowIndex, columnIndex, totalColumns) {
      let lengthOfColumns = columns.length

      if (columns[0] && columns[0].colSpan) {
        lengthOfColumns = 0

        for (let column of columns) {
          lengthOfColumns += column.colSpan
        }
      }

      if (columnIndex === columns.length - 1 && lengthOfColumns === totalColumns) {
        return true
      }

      return false
    },
    updateLayout() {
      const tableBodyCenter = this.$el.querySelector('.soupe-ui-table-body-center')
      const tableBodyCenterTable = this.$el.querySelector('.soupe-ui-table-body-center table')

      if (tableBodyCenterTable.clientHeight > tableBodyCenter.clientHeight - 2) {
        self.bodyScrollableV = true
      } else {
        self.bodyScrollableV = false
      }

      this.widthOfBodyCenter = tableBodyCenter.clientWidth
    },
    changePageSize(pageSize) {
      if (this.paging && pageSize + '' !== this.size + '') {
        this.$cookie.set('page_size', pageSize)

        this.$emit('page-changed', 1, pageSize)
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.$emit('page-changed', this.page - 1, this.size)
      }
    },
    nextPage() {
      if (this.page < this.totalPage) {
        this.$emit('page-changed', this.page + 1, this.size)
      }
    },
    onCheck(event, record) {
      this.$emit(
        'record-checking',
        event.target.checked,
        record,
        this.records
      )
    },
    isChecked(record) {
      if (this.selectionConfigs.isChecked) {
        return this.selectionConfigs.isChecked(record)
      }

      return record.checked
    },
    checkingAll(checked, records) {
      for (let record of records) {
        this.$set(record, 'checked', checked)
      }
    },
    internalCheckingAll(event) {
      let checked = event.target.checked

      if (this.selectionConfigs && this.records) {
        if (this.selectionConfigs.checkingAll) {
          this.selectionConfigs.checkingAll(checked, this.records)
        } else {
          this.checkingAll(checked, this.records)
        }
      }
    }
  }
}
</script>
