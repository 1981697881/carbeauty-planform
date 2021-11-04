<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'美容项目'" prop="cosmetologyPoject">
            <el-input v-model="form.cosmetologyPoject"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'车型'" prop="carModel">
            <el-select v-model="form.carModel" class="width-full"  placeholder="请选择车型">
              <el-option :label="t.label" :value="t.value" v-for="(t,i) in pArray" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'标准费用'" prop="standardPrice">
            <el-input-number v-model="form.standardPrice" :min="1"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'项目提成'" prop="commissionPrice">
            <el-input-number v-model="form.commissionPrice" :min="1"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'是否启用'" prop="status">
            <el-switch
              v-model="form.status"
              active-value="0"
              inactive-value="1">
            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <!--<el-row :gutter="20">
        <el-col :span="24" style="text-align: center">
          <el-form-item :label="'封面照片'">
            <el-upload
              :action="fileUrl"
              list-type="picture-card"
              accept="image/jpeg,image/jpg,image/png,image/gif"
              :headers="headers"
              :limit="1"
              name="imgS"
              :on-success="uploadPosterSuccess"
              :on-error="uploadError"
              :class="{hide:hidePicture}"
              :on-preview="handlePictureCardPreview"
              :on-change="handlePictureChange"
              :file-list="pictureList"
              :before-upload="beforeUploadImage"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" append-to-body size="tiny">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24" style="text-align: center">
          <el-form-item :label="'机台海报'">
            <el-upload
              :action="fileUrl"
              list-type="picture-card"
              accept="image/jpeg,image/jpg,image/png,image/gif"
              :headers="headers"
              :limit="1"
              name="imgS"
              :on-success="uploadStillSuccess"
              :on-error="uploadError"
              :class="{hide:hideStillUpload}"
              :on-preview="handlePictureCardPreview"
              :on-change="handleStillChange"
              :file-list="stillList"
              :before-upload="beforeUploadImage"
              :on-remove="handleRemovet">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" append-to-body size="tiny">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <quill-editor v-model="form.playTxt"  :options="quillOption" style="height: 200px"></quill-editor>
        </el-col>
      </el-row>-->
    </el-form>
    <div slot="footer" style="text-align:center;padding-top: 100px">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>
  import {addProject} from "@/api/basic/index";
  import { quillEditor } from 'vue-quill-editor'
  import quillConfig from '@/quill-config.js'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import {
    getToken
  } from '@/utils/auth'

  export default {
    components: { quillEditor },
    props: {
      listInfo: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        headers: {
          'authorization': getToken('cinerx'),
        },
        quillOption: quillConfig,
        fileUrl: '',
        images: [],
        imagesPoster: [],
        hidePicture: false,
        hideStillUpload: false,
        dialogImageUrl: '',
        dialogVisible: false,
        pictureList: [],
        stillList: [],
        limitPicture: 1,
        limitStill: 3,
        nowImg: [],
        form: {
          carModel: null,
          commissionPrice: null,
          cosmetologyPoject: null,
          status: '0',
          standardPrice: null,
        },
        videoFlag: false,
        videoUploadPercent: 0,
        pArray: [
          {value: '五座',label: '五座'},
          {value: 'SUV/商务车',label: 'SUV/商务车'}
        ],
        rules: {
          cosmetologyPoject: [
            {required: true, message: '请输入', trigger: 'blur'},
          ],
        },
      };
    },
    mounted() {
     /* this.fileUrl  = `${window.location.origin}/web/file/imgUpload`*/
      if (this.listInfo) {
        this.form = this.listInfo
      /*  this.pictureList = []
        if(this.form.playPhoto != null && this.form.playPhoto.length>0){
          this.pictureList.push({
            url: this.$store.state.user.url+'/movie/uploadFiles/image/' + this.form.playPhoto
          })
          this.hidePicture = true
        }else{
          this.hidePicture = false
        }
        this.listInfo.playPosterphotoList = this.listInfo.playPosterphotoList.filter(function(n) { return n; });
        if (this.form.playPosterphotoList.length > 0) {
          //到图片数量大于3或等于3时添加按钮隐藏
          if (this.form.playPosterphotoList.length >= 3) {
            this.hideStillUpload = true;
          } else {
            this.hideStillUpload = false;
          }
          this.stillList = []
          for (let i in this.form.playPosterphotoList) {
            this.stillList.push({
              url: this.$store.state.user.url+'/movie/uploadFiles/image/' + this.form.playPosterphotoList[i]
            })
          }
        } else {
          this.stillList = [];
        }*/
      }
    },
    methods: {
      //上传失败事件
      uploadError(res) {
        this.$message({
          message: res.msg,
          type: "warning"
        });
        this.$emit('uploadList')
      },
      //封面上传成功
      uploadPosterSuccess(res, file, fileList) {
        file.name = res.data;
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.form.playPhoto=res.data
      },
      //海报上传成功
      uploadStillSuccess(res, file, fileList) {
        file.name = res.data;
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.form.playPosterphotoList.push(res.data)
      },
      //删除图片
      handleRemove(file, fileList) {
        let array = this.pictureList;
        let img =file.url.split(this.$store.state.user.url+'/movie/uploadFiles/image/')[1]
            array.forEach((item,index)=>{
              if (item.url.split(this.$store.state.user.url+'/movie/uploadFiles/image/')[1] == img) {
                array.splice(index, 1);
              }
            })
            this.$emit('uploadList')
        this.form.playPhoto= null
        this.hidePicture = false
      },
      handleRemovet(file, fileList) {
        let array = this.stillList;
        let img =file.url.split(this.$store.state.user.url+'/movie/uploadFiles/image/')[1]
        array.forEach((item,index)=>{
          if (item.url.split(this.$store.state.user.url+'/movie/uploadFiles/image/')[1] == img) {
            array.splice(index, 1);
          }
        })
        this.form.playPosterphotoList.forEach((item,index)=>{
          if(item == img){
            this.form.playPosterphotoList.splice(index, 1);
          }
        })
        this.$emit('uploadList')
        this.hideStillUpload = false
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      beforeUploadImage(){

      },
      handlePictureChange(file, fileList) {
        this.hidePicture = fileList.length >= this.limitPicture;
      },
      handleStillChange(file, fileList) {
        this.hideStillUpload = fileList.length >= this.limitStill;
      },
      saveData(form) {
        this.$refs[form].validate((valid) => {
          //判断必填项
          if (valid) {
           // if(this.form.playPhoto){
              //修改
              let param = this.form
            addProject(param).then(res => {
                this.$emit('hideDialog', false)
                this.$emit('uploadList')
              });
            /*}else{
              this.$message({
                message: '请上传图片',
                type: "warning"
              });
            }*/
          } else {
            return false;
          }
        })

      },

    }
  };
</script>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
</style>
<style lang="scss">
  .hide .el-upload--picture-card {
    display: none;
  }
</style>
