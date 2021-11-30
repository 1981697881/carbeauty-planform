<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'名称'" prop="platformName">
            <el-input v-model="form.platformName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>
  import { addPayPlatform } from "@/api/basic/index";
  export default {
    props: {
      listInfo: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        form: {
          platformName: null,// 名称
        },
        rules: {
          platformName: [
            {required: true, message: '请输入名稱', trigger: 'blur'},
          ],
        },
      };
    },
    mounted() {
      if (this.listInfo) {
        this.form = this.listInfo
      }
    },
    methods: {
      saveData(form) {
        this.$refs[form].validate((valid) => {
          // 判断必填项
          if (valid) {
            addPayPlatform(this.form).then(res => {
              this.$emit('hideDialog', false)
              this.$emit('uploadList')
            });
          } else {
            return false;
          }
        })
      },
    }
  };
</script>

<style>
</style>
