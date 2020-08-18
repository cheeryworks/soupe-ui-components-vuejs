<template>
  <soupe-ui-select
    class="soupe-ui-date-picker"
    ref="select"
    :readonly="readonly"
    :border="border"
    :width="width"
    :left-label="leftLabel"
    :right-label="rightLabel"
    :value="formatDate(currentValue)"
    :customized-name="formatDate(currentValue)"
    :close-on-click="true"
  >
    <div class="panel is-primary">
      <div class="panel-heading columns is-gapless is-vcentered">
        <div class="column has-text-centered" @click="prevMonthPreview()">
          <span class="icon">
            <i class="fas fa-caret-left"></i>
          </span>
        </div>
        <div
          class="column has-text-centered"
          @click="chType('year')"
          v-text="tmpYear"
        ></div>
        <div class="column has-text-centered" @click="chType('month')">
          {{ translateMonth(tmpMonth + 1) }}
        </div>
        <div class="column has-text-centered" @click="nextMonthPreview()">
          <span class="icon">
            <i class="fas fa-caret-right"></i>
          </span>
        </div>
      </div>
      <div v-show="panelType === 'year'">
        <div class="columns is-vcentered is-gapless px-0 py-0">
          <div class="column has-text-centered" @click="chYearRange(0)">
            <span class="icon">
              <i class="fas fa-angle-left"></i>
            </span>
          </div>
          <div class="column has-text-centered">
            <span v-text="yearList[0]"></span> -
            <span v-text="yearList[yearList.length - 1]"></span>
          </div>
          <div class="column has-text-centered" @click="chYearRange(1)">
            <span class="icon">
              <i class="fas fa-angle-right"></i>
            </span>
          </div>
        </div>
        <div class="columns is-multiline is-vcentered mx-0 my-0 px-2 py-2">
          <div
            class="column is-4 has-text-centered"
            v-for="item in yearList"
            v-text="item"
            :key="item"
            :class="{
              'has-background-primary': isSelected('year', item)
            }"
            @click="selectYear(item)"
          ></div>
        </div>
      </div>
      <div v-show="panelType === 'month'">
        <div class="columns is-multiline is-vcentered mx-0 my-0 px-2 py-2">
          <div
            class="column is-4 has-text-centered"
            v-for="(item, index) in monthList"
            :key="item"
            :class="{
              'has-background-primary': isSelected('month', item)
            }"
            @click="selectMonth(index)"
          >
            {{ translateMonth(item) }}
          </div>
        </div>
      </div>
      <div v-show="panelType === 'date'">
        <div class="columns is-gapless mx-0 my-0 px-2 py-2">
          <div
            class="column has-text-centered mx-1"
            v-for="item in weekList"
            :key="item"
          >
            {{ translateWeek(item) }}
          </div>
        </div>
        <div
          class="columns is-gapless mx-0 my-0 px-2 py-2"
          v-for="(daysOfWeek, weekIndex) in daysOfMonth"
          :key="weekIndex"
        >
          <div
            class="column has-text-centered mx-1"
            v-for="(dayOfWeek, dayOfWeekIndex) in daysOfWeek"
            :key="dayOfWeekIndex"
            :class="{
              'has-text-grey-light': !dayOfWeek.currentMonth,
              'has-background-primary': isSelected('date', dayOfWeek)
            }"
            @click="selectDate(dayOfWeek)"
          >
            {{ dayOfWeek.value }}
          </div>
        </div>
      </div>
    </div>
  </soupe-ui-select>
</template>

<script>
  export default {
    name: 'soupe-ui-date-picker',
    props: {
      language: { default: 'en' },
      readonly: { default: false },
      leftLabel: String,
      rightLabel: String,
      width: String,
      border: {
        type: Boolean,
        default: true
      },
      min: { default: '1900-01-01' },
      max: { default: '3000-01-01' },
      value: {
        type: String,
        default: ''
      }
    },
    data() {
      let now = new Date()

      return {
        panelType: 'date',
        year: now.getFullYear(),
        month: now.getMonth(),
        date: now.getDate(),
        tmpYear: now.getFullYear(),
        tmpMonth: now.getMonth(),
        minYear: Number,
        minMonth: Number,
        minDate: Number,
        maxYear: Number,
        maxMonth: Number,
        maxDate: Number,
        yearList: Array.from(
          { length: 12 },
          (value, index) => new Date().getFullYear() + index
        ),
        monthList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        weekList: [0, 1, 2, 3, 4, 5, 6],
        currentValue: this.value
      }
    },
    methods: {
      isSelected(type, item) {
        if (type === 'year') {
          return item === this.tmpYear
        } else if (type === 'month') {
          return item === this.tmpMonth + 1 && this.year === this.tmpYear
        } else if (type === 'date') {
          return (
            this.date === item.value &&
            this.month === this.tmpMonth &&
            item.currentMonth
          )
        }
      },
      chType(type) {
        this.panelType = type

        if (type === 'year') {
          this.yearList = Array.from(
            { length: 12 },
            (value, index) => new Date().getFullYear() + index
          )
        }
      },
      chYearRange(next) {
        if (next) {
          this.yearList = this.yearList.map((i) => i + 12)
        } else {
          this.yearList = this.yearList.map((i) => i - 12)
        }
      },
      prevMonthPreview() {
        this.tmpMonth = this.tmpMonth === 0 ? 0 : this.tmpMonth - 1
      },
      nextMonthPreview() {
        this.tmpMonth = this.tmpMonth === 11 ? 11 : this.tmpMonth + 1
      },
      selectYear(year) {
        if (this.validateYear(year)) return
        this.tmpYear = year
        this.panelType = 'month'
      },
      selectMonth(month) {
        if (this.validateMonth(month)) return
        this.tmpMonth = month
        this.panelType = 'date'
      },
      selectDate(date) {
        let self = this
        setTimeout(function () {
          self.selectDateSetTimeOutFunc(date)
        }, 0)
      },
      selectDateSetTimeOutFunc(date) {
        let value = this.currentValue

        if (this.validateDate(date)) {
          return
        }

        if (date.previousMonth) {
          if (this.tmpMonth === 0) {
            this.year -= 1
            this.tmpYear -= 1
            this.month = this.tmpMonth = 11
          } else {
            this.month = this.tmpMonth - 1
            this.tmpMonth -= 1
          }
        } else if (date.nextMonth) {
          if (this.tmpMonth === 11) {
            this.year += 1
            this.tmpYear += 1
            this.month = this.tmpMonth = 0
          } else {
            this.month = this.tmpMonth + 1
            this.tmpMonth += 1
          }
        }

        this.year = this.tmpYear
        this.month = this.tmpMonth
        this.date = date.value
        value = `${this.tmpYear}-${('0' + (this.month + 1)).slice(-2)}-${(
          '0' + this.date
        ).slice(-2)}`
        this.$emit('soupe-ui-date-picker-value-changed', value)

        this.currentValue = value

        this.$refs.select.close()
      },
      validateYear(year) {
        return year > this.maxYear || year < this.minYear
      },
      validateMonth(month) {
        var condition1 =
          new Date(this.tmpYear, month).getTime() >=
          new Date(this.minYear, this.minMonth - 1).getTime()
        var condition2 =
          new Date(this.tmpYear, month).getTime() >=
          new Date(this.minYear, this.minMonth - 1).getTime()

        return !(condition1 && condition2)
      },
      validateDate(date) {
        let mon = this.tmpMonth
        if (date.previousMonth) {
          mon -= 1
        } else if (date.nextMonth) {
          mon += 1
        }

        var condition1 =
          new Date(this.tmpYear, mon, date.value).getTime() >=
          new Date(this.minYear, this.minMonth - 1, this.minDate).getTime()
        var condition2 =
          new Date(this.tmpYear, mon, date.value).getTime() <=
          new Date(this.maxYear, this.maxMonth - 1, this.maxDate).getTime()
        return !(condition1 && condition2)
      },
      clear() {
        this.$emit('soupe-ui-date-picker-value-clear', '')
      },
      formatDate(date) {
        if (typeof date === 'string') {
          return date
        }

        return date.getFullYear + '-' + (date.getMonth + 1 > 9)
          ? ''
          : '0' + (date.getMonth + 1) + '-' + (date.getDay > 9)
          ? ''
          : '0' + date.getDay
      },
      translateWeek(item) {
        return {
          0: this.$t('global.components.date_picker.weeks.sun'),
          1: this.$t('global.components.date_picker.weeks.mon'),
          2: this.$t('global.components.date_picker.weeks.tue'),
          3: this.$t('global.components.date_picker.weeks.wed'),
          4: this.$t('global.components.date_picker.weeks.thu'),
          5: this.$t('global.components.date_picker.weeks.fri'),
          6: this.$t('global.components.date_picker.weeks.sat')
        }[item]
      },
      translateMonth(item) {
        return {
          1: this.$t('global.components.date_picker.months.jan'),
          2: this.$t('global.components.date_picker.months.feb'),
          3: this.$t('global.components.date_picker.months.mar'),
          4: this.$t('global.components.date_picker.months.apr'),
          5: this.$t('global.components.date_picker.months.may'),
          6: this.$t('global.components.date_picker.months.jun'),
          7: this.$t('global.components.date_picker.months.jul'),
          8: this.$t('global.components.date_picker.months.aug'),
          9: this.$t('global.components.date_picker.months.sep'),
          10: this.$t('global.components.date_picker.months.oct'),
          11: this.$t('global.components.date_picker.months.nov'),
          12: this.$t('global.components.date_picker.months.dec')
        }[item]
      }
    },
    watch: {
      min(v) {
        let minArr = v.split('-')
        this.minYear = Number(minArr[0])
        this.minMonth = Number(minArr[1])
        this.minDate = Number(minArr[2])
      },
      max(v) {
        let maxArr = v.split('-')
        this.maxYear = Number(maxArr[0])
        this.maxMonth = Number(maxArr[1])
        this.maxDate = Number(maxArr[2])
      }
    },
    computed: {
      daysOfMonth() {
        let currentMonthLength = new Date(
          this.tmpYear,
          this.tmpMonth + 1,
          0
        ).getDate()

        let days = Array.from({ length: currentMonthLength }, (val, index) => {
          return {
            currentMonth: true,
            value: index + 1
          }
        })

        let startDay = new Date(this.tmpYear, this.tmpMonth, 1).getDay()
        let previousMonthLength = new Date(
          this.tmpYear,
          this.tmpMonth,
          0
        ).getDate()

        for (let i = 0; i < startDay; i++) {
          days = [
            { previousMonth: true, value: previousMonthLength - i }
          ].concat(days)
        }

        let daysOfMonth = []
        let daysOfWeek = []

        for (let i = days.length, item = 1; i < 42; i++, item++) {
          days[i] = { nextMonth: true, value: item }
        }

        for (let i = 0; i < 42; i++) {
          daysOfWeek.push(days[i])

          if ((i + 1) % 7 == 0) {
            let realDaysOfWeek = [...daysOfWeek]
            daysOfMonth.push(realDaysOfWeek)
            daysOfWeek = []
          }
        }

        return daysOfMonth
      }
    },
    mounted() {
      this.$nextTick(() => {
        let minArr = this.min.split('-')
        this.minYear = Number(minArr[0])
        this.minMonth = Number(minArr[1])
        this.minDate = Number(minArr[2])

        let maxArr = this.max.split('-')
        this.maxYear = Number(maxArr[0])
        this.maxMonth = Number(maxArr[1])
        this.maxDate = Number(maxArr[2])

        if (!this.value) {
          this.$emit('soupe-ui-date-picker-value-changed', '')
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  @import '~bulma/sass/utilities/_all';

  .soupe-ui-date-picker .button {
    width: 100%;
  }

  .soupe-ui-date-picker > .panel {
    margin-top: 5px;
  }

  .soupe-ui-date-picker .has-background-primary {
    border-radius: $radius;
    font-weight: 600;
    color: $white;
  }

  .soupe-ui-date-picker .has-text-centered {
    cursor: pointer;
  }
</style>
