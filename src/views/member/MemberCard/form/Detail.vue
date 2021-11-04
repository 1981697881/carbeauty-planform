<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'名称'" prop="vipName">
            <el-input v-model="form.vipName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'联系电话'" prop="phoneNumber">
            <el-input v-model="form.phoneNumber"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'会员信息'" prop="orgAttr">
            <div style="margin-top: 20px;margin-bottom: 10px">
              <el-button @click="setRow">添加</el-button>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog
      :visible.sync="visible"
      title="微信用户"
      v-if="visible"
      :width="'50%'"
      destroy-on-close
      append-to-body
    >
      <el-form ref="postform" label-width="80px" :size="'mini'">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label-width="0">
              <el-input v-model="username" placeholder="名称"><el-button slot="append" icon="el-icon-search" @click="fetchFormat"></el-button></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="20">
          <el-col :span="24">
            <el-table class="list-main" height="200px" :data="list" border size="mini" :highlight-current-row="true"
                      @row-dblclick="dblclick">
              <el-table-column
                v-for="(t,i) in columns"
                :key="i"
                align="center"
                :prop="t.name"
                :label="t.text"
                v-if="t.default!=undefined?t.default:true"
                :width="t.width?t.width:''"
              ></el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>
  import {addVip, getMemberList} from "@/api/member/index";

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
          phoneNumber: null,
          vipName: null,
        },
        list: [],
        columns: [
          {text: "会员名称", name: "username"},
          {text: "微信号", name: "wechatId"},
          {text: "联系地址", name: "adress"},
          {text: "联系电话", name: "phoneNumber"},
          {text: "注册时间", name: "createDatetime"},
          {text: "最后登录时间", name: "editDatetime"},
          {text: "生日", name: "birthday"},
          {text: "性别", name: "sex"},
          {text: "描述", name: "describes"},
        ],
        value1: '',
        username: '',
        visible: null,
        rules: {
          phoneNumber: [
            {required: true, message: '请输入', trigger: 'blur'},
          ],
          vipName: [
            {required: true, message: '请输入', trigger: 'blur'},
          ],
        },
      };
    },
    mounted() {
      this.fetchFormat()
      if (this.listInfo) {
        this.form = this.listInfo

      }
    },
    methods: {
      setRow() {
        this.visible = true
      },
      dblclick(obj) {
        this.visible = false;
        this.form.vipName = obj.username;
        this.form.phoneNumber = obj.phoneNumber;
      },
      saveData(form) {
        this.$refs[form].validate((valid) => {
          // 判断必填项
          if (valid) {
            addVip(this.form).then(res => {
              this.$emit('hideDialog', false)
              this.$emit('uploadList')
            });
          } else {
            return false;
          }
        })
      },
      fetchFormat() {
        const data = {
          pageNum: 1,
          pageSize: 50,
        };
        getMemberList(data, {username: this.username}).then(res => {
          this.list = res.data.records
        });
      },
    }
  };
</script>

<style>
</style>
