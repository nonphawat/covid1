<template>
  <div>
    <h1 class="text-center">บันทึกการตรวจ Covid-19</h1>
    <br /><br />

    <v-layout row wrap justify-center class="text-center">
      <v-flex xs6>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="วันที่"
                v-bind="attrs"
                v-on="on"
                readonly
                :rules="[(v) => !!v || 'ใส่วันที่']"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              :active-picker.sync="activePicker"
              :max="
                new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                  .toISOString()
                  .substr(0, 10)
              "
              min="1950-01-01"
              @change="save"
            ></v-date-picker>
          </v-menu>

          <v-text-field
            v-model="name"
            :rules="[(v) => !!v || 'โปรดใส่ชื่อ-นามสกุล']"
            label="ชื่อ-นามสกุล"
            required
          ></v-text-field>

          <v-text-field
            v-model="tel"
            :rules="[(v) => !!v || 'โปรดกรอกเบอร์']"
            label="หมายเลขโทรศัพท์"
            required
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-select
            v-model="atk"
            :items="items"
            label="ผลตรวจ ATK"
            :rules="[(v) => !!v || 'ใส่ผลตรวจ']"
            required
          ></v-select>
        </v-form>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4 mb-5"
          :loading="load"
          @click="validate"
          
        >
          บันทึก
        </v-btn>
        <v-snackbar v-model="snackbar">
          {{ text }}

          <template v-slot:action="{ attrs }">
            <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>

       
        
      </v-flex>
    </v-layout>
    <CovidData :list="data" :loadin="loadDta" @getData="readData"></CovidData>
  </div>
</template>

<script>
import db from "@/plugins/firebase1";
import { collection, addDoc, getDocs } from "firebase/firestore";
import CovidData from "@/components/DataCovid.vue"
export default {

    components:{
      CovidData
    },

  data() {
    return {
      valid: true,
      name: "",

      email: "",
      emailRules: [
        (v) => !!v || "ใส่ E-mail",
        (v) => /.+@.+\..+/.test(v) || "E-mail ต้องถูกต้อง",
      ],
      data:[],
      items: ["+ เป็นโควิด", "- ไม่เป็นโควิด"],

      tel: "",
      load: false,
      activePicker: null,
      date: null,
      menu: false,
      atk: "",
      snackbar: false,
      text: `บันทึกข้อมูลของท่านแล้ว`,
      loadDta:false
    };
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },

    async validate() {
      if (
        this.name == "" ||
        this.date == null ||
        this.tel == "" ||
        this.email == "" ||
        this.atk == ""
      ) {
        console.log("No");
        this.$refs.form.validate();
      } else {
        this.load = true;
        try {
          const docRef = await addDoc(collection(db, "Covid"), {
            date: this.date,
            name: this.name,
            tel: this.tel,
            email: this.email,
            status: this.atk,
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }

        

        

        this.snackbar = true;
        this.load = false;
        this.data.splice(0, this.data.length)
      const querySnapshot = await getDocs(collection(db, "Covid"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        this.data.push(doc.data());
      });
      }
    },
    async readData(i) {
      this.loadDta= !this.loadDta
      if (i==true){
        console.log("Show Data...")
        
      this.data.splice(0, this.data.length)
      const querySnapshot = await getDocs(collection(db, "Covid"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        this.data.push(doc.data());
      });
      this.loadDta= false
      } else{
        this.loadDta= false
        console.log("Not show Data...")
      }
      
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
};
</script>

<style>
</style>