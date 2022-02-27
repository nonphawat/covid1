<template>
  <div>
    <v-btn
      color="primary"
      elevation="4"
      class="d-flex flex-row mb-6"
      :loading="loadin"
      @click="show_detail"
      >{{ v_show ? "เลิกแสดง" : "แสดง" }}ข้อมูล</v-btn
    >
    <v-simple-table dark v-show="v_show">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">ชื่อ-นามสกุล</th>
            <th class="text-left">เบอร์โทร</th>
            <th class="text-left">E-mail</th>
            <th class="text-left">Date</th>
            <th class="text-left">ผลตรวจ ATK.</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in list" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.tel }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.date }}</td>
            <td v-if="item.status == '+ เป็นโควิด'" class="co">
              {{ item.status }}
            </td>
            <td v-else style="color=red;">{{ item.status }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  props: ["list", "loadin"],
  data() {
    return {
      load: false,
      v_show: false,
    };
  },
  methods: {
    show_detail() {
      this.v_show = !this.v_show;
      this.$emit("getData", this.v_show);
    },
  },
};
</script>

<style>
.co {
  background-color: yellow;
  color: black;
}
</style>