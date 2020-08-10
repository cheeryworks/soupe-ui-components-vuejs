<template>
  <soupe-ui-table
    class="hero-body px-0 py-0"
    paging
    pageSizeInBottom
    :fixedLeftColumns="1"
    :fixedRightColumns="1"
    :columns="columns"
    :records="records"
    :selectionConfigs="selectionConfigs"
  ></soupe-ui-table>
</template>

<script>
  export default {
    name: 'soupe-ui-table-demo',
    data() {
      return {
        columns: [
          {
            title: 'A',
            name: 'a',
            width: 100
          },
          {
            title: 'BC',
            columns: [
              {
                title: 'B',
                name: 'b',
                width: 200
              },
              {
                title: 'C',
                name: 'c',
                width: 200
              }
            ]
          },
          {
            title: 'D',
            name: 'd',
            width: 200
          },
          {
            title: 'E',
            name: 'e',
            width: 200
          },
          {
            title: 'F',
            name: 'f',
            width: 100
          }
        ],
        selectionConfigs: {
          selectAll: true,
          multipleSelect: true
        },
        records: [
          {
            a: 'A',
            b: 'B',
            c: 'C',
            d: 'D',
            e: 'E',
            f: 'F'
          },
          {
            a: 'A',
            b: 'B',
            c: 'C',
            d: 'D',
            e: 'E',
            f: 'F'
          },
          {
            a: 'A',
            b: 'B',
            c: 'C',
            d: 'D',
            e: 'E',
            f: 'F'
          },
          {
            a: 'A',
            b: 'B',
            c: 'C',
            d: 'D',
            e: 'E',
            f: 'F'
          },
          {
            a: 'A',
            b: 'B',
            c: 'C',
            d: 'D',
            e: 'E',
            f: 'F'
          },
          {
            a: 'A',
            b: 'B',
            c: 'C',
            d: 'D',
            e: 'E',
            f: 'F'
          },
          {
            a: 'A',
            b: 'B',
            c: 'C',
            d: 'D',
            e: 'E',
            f: 'F'
          },
          {
            a: 'A',
            b: 'B',
            c: 'C',
            d: 'D',
            e: 'E',
            f: 'F'
          },
          {
            a: 'A',
            b: 'B',
            c: 'C',
            d: 'D',
            e: 'E',
            f: 'F'
          },
          {
            a: 'A',
            b: 'B',
            c: 'C',
            d: 'D',
            e: 'E',
            f: 'F'
          },
          {
            a: 'A',
            b: 'B',
            c: 'C',
            d: 'D',
            e: 'E',
            f: 'F'
          },
          {
            a: 'A',
            b: 'B',
            c: 'C',
            d: 'D',
            e: 'E',
            f: 'F'
          },
          {
            a: 'A',
            b: 'B',
            c: 'C',
            d: 'D',
            e: 'E',
            f: 'F'
          },
          {
            a: 'A',
            b: 'B',
            c: 'C',
            d: 'D',
            e: 'E',
            f: 'F'
          }
        ]
      }
    }
  }
</script>
