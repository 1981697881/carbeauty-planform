<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'会员卡'" prop="vipNumber">
            <el-input v-model="form.vipNumber"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
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
          <el-form-item :label="'车辆信息'" prop="orgAttr">
            <div style="margin-top: 20px;margin-bottom: 10px">
              <el-button @click="setRow">添加</el-button>
              <el-button @click="delRow">删除</el-button>
            </div>
            <el-table class="list-main" height="200px" :data="form.vipCarmessageCars" border size="mini" :highlight-current-row="true"
                      @row-dblclick="dblclick" @row-click="rowClick">
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
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog
      :visible.sync="visible"
      title="车辆信息"
      v-if="visible"
      :width="'50%'"
      destroy-on-close
      append-to-body
    >
      <el-form ref="postform" :model="postform" :rules="rules" label-width="80px" :size="'mini'">
        <!--<el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label-width="0">
              <el-input v-model="username" placeholder="名称"><el-button slot="append" icon="el-icon-search" @click="fetchFormat"></el-button></el-input>
            </el-form-item>
          </el-col>
        </el-row>-->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'车牌号'" prop="carNumber">
              <el-input v-model="postform.carNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'车型'" prop="carModel">
              <el-select v-model="postform.carModel" class="width-full" placeholder="请选择车型">
                <el-option :label="t.label" :value="t.value" v-for="(t,i) in pArray" :key="i"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" style="text-align:center;padding-top: 15px">
        <el-button type="success" @click="confirm">确认</el-button>
      </div>
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
          vipNumber: null,
          vipCarmessageCars: [],
        },
        postform: {
          carNumber: null,
          carModel: null,
        },
        columns: [
          {text: "车牌号", name: "carNumber"},
          {text: "车型", name: "carModel"},
        ],
        pArray: [
          {value: '五座', label: '五座'},
          {value: 'SUV/商务车', label: 'SUV/商务车'}
        ],
        value1: '',
        username: '',
        visible: null,
        rules: {
          vipNumber: [
            {required: true, message: '请输入', trigger: 'blur'},
          ],
          phoneNumber: [
            {required: true, message: '请输入', trigger: 'blur'},
          ],
          carNumber: [
            {required: true, message: '请输入', trigger: 'blur'},
            {validator: this.isVehicleNumber, message: '请输入正确格式的车牌号', trigger: "blur"},
          ],
          vipName: [
            {required: true, message: '请输入', trigger: 'blur'},
          ],
          carModel: [
            {required: true, message: '请选择', trigger: 'change'},
          ],
        },
      };
    },
    mounted() {
      /*this.fetchFormat()*/
      if (this.listInfo) {
        this.form = this.listInfo
      }
    },
    methods: {
      // 选中
      rowClick(obj) {
        this.checkData = obj
      },
      isVehicleNumber(rule, value, callback) {
        let reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
        if (!reg.test(value)) {
          callback(new Error())
        } else {
          callback()
        }
      },
      setRow() {
        this.visible = true
      },
      // 删除
      delRow() {
        if (this.checkData.id) {
          this.$confirm('是否删除(' + this.checkData.carNumber + ')?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.form.vipCarmessageCars.splice(this.checkData, 1)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        } else {
          this.$message({
            message: '无选中行',
            type: 'warning'
          })
        }
      },
      dblclick(obj) {
        this.visible = false;
        this.postform = obj;
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
      // 确认
      confirm() {
        let me = this
        this.$refs['postform'].validate((valid) => {
          // 判断必填项
          if (valid) {
            me.visible = false
            if(me.form.vipCarmessageCars.length >0){
              me.form.vipCarmessageCars.forEach((item)=>{
                if(item.carNumber != me.postform.carNumber){
                  me.form.vipCarmessageCars.push({
                    carNumber: me.postform.carNumber,
                    carModel: me.postform.carModel,
                    vipNumber: me.form.vipNumber,
                  })
                  me.checkData = null
                }else{
                  this.$message({
                    message: '添加的车牌重复',
                    type: 'warning'
                  })
                }
              })
            }else{
              me.form.vipCarmessageCars.push({
                carNumber: me.postform.carNumber,
                carModel: me.postform.carModel,
                vipNumber: me.form.vipNumber,
              })
              me.checkData = null
            }
          } else {
            return false
          }
        })
      },
      fetchFormat() {
        const data = {
          pageNum: 1,
          pageSize: 50,
        };
        getMemberList(data, {}).then(res => {
          this.list = res.data.records
        });
      },
    }
  };
</script>

<style>
</style>
