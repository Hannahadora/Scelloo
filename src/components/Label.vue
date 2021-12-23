<template>
  <div class="h-label">
    <slot></slot>
  </div>
</template>

<script>
export default {
    name: 'Label',
    data() {
        return {
activeStyle: {
    background: "#E6E6F2",
    color: "#4A4AFF",
},

inactiveStyle: {
    background: "#F2F0F9",
    color: "#6E6893",
},

paidStyle: {
    background: "#CDFFCD",
    color: "#007F00",
},

unpaidStyle: {
    background: "#FFECCC",
    color: "#965E00",
},

overdueStyle: {
    background: "#FFE0E0",
    color: "#D30000",
}
        }
    },

    props: {
        active: {
            type: Boolean,
        },
        inactive: {
            type: Boolean,
        },
        paid: {
            type: Boolean,
        },
        unpaid: {
            type: Boolean,
        },
        overdue: {
            type: Boolean,
        },
    },

    computed: {
        style() {
            return {
                ...(this.active && this.activeStyle),
                ...(this.inactive && this.inactiveStyle),
                ...(this.paid && this.paidStyle),
                ...(this.unpaid && this.unpaidStyle),
                ...(this.overdue && this.overdueStyle),
                textTransform: "capitalize",
            };
        },
  }
};
</script>

<style>
.h-label {
    padding: 5px;
    font-size: 12px;
   line-height: 15px;
border-radius: 10px;
}
/* 
.activeStyle {
    background: #E6E6F2;
    color: #4A4AFF;
}

.inactiveStyle {
    background: #F2F0F9;
    color: #6E6893;;
}

.paidStyle {
    background: #CDFFCD;
    color: #007F00;
}

.unpaidStyle {
    background: #FFECCC;
    color: #965E00
;
}
.overdueStyle {
    background: #FFE0E0;
    color: #D30000
;
} */
</style>