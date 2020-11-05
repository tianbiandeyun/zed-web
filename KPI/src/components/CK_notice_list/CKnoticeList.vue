<template>
  <section>
    <p v-for="(item,index) in message"
       :key="index"
       style="display: inline-block">
      {{item.type === "str" ? item.val : ""}}
      <ww-open-data
        v-if="item.type === 'userName'"
        :corpid="item.val.cid"
        :openid="item.val.uid"
        type="userName">
      </ww-open-data>
    </p>
  </section>
</template>

<script>
  export default {
    name: "CK_notice_list",
    props: {
      item: {
        type: String
      }
    },
    methods: {
      convertObj(aimstr) {
        const re = new RegExp(/cid:.*,uid:.*/);
        if (re.test(aimstr)) {
          // 这种情况就是用户信息对象
          // 首先用,号进行分割。
          let userinfo_arr = aimstr.split(",");
          let userinfoobj = { uid: "", cid: "" };
          for (let userinfo of userinfo_arr) {
            let recid = new RegExp(/cid:(.*)/);
            let reuid = new RegExp(/uid:(.*)/);
            if (recid.test(userinfo)) {
              userinfoobj.cid = RegExp.$1;
            } else if (reuid.test(userinfo)) {
              userinfoobj.uid = RegExp.$1;
            }
          }
          return { type: "userName", val: userinfoobj };
        }
        return { type: "str", val: aimstr };
      }
    },
    computed: {
      message() {
        const that = this;
        let splitarr = that.item.split("|||");
        let resultdata_arr = [];
        for (let aimstr of splitarr) {
          resultdata_arr.push(that.convertObj(aimstr));
        }
        return resultdata_arr;
      }
    }
  };
</script>

<style>

</style>
