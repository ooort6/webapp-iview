<template>
  <Row>
   <Col span="4">
      <card v-if="categoryTree.operation.success">
        <p slot="title">
          <Icon type="ios-film-outline"></Icon>
          栏目树
        </p>
        <Tree :data="categoryTree.data" @on-select-change="handleCategoryChanged"></Tree>
      </card>
      <card v-else>
        {{categoryTree.operation.message}}
      </card>
    </Col>
  <Col span="20" v-if="query.categoryId > 0">
      <card v-if="table.operation.success">
        <p slot="title">
          <Icon type="ios-film-outline"></Icon>
          文章列表
        </p>

        <div style="margin-bottom: 10px;">
          <Input clearable placeholder="文章标题" v-model="query.title" style="width: 200px;" />
          <Button type="primary" icon="ios-search" @click="searchArticle" style="margin-left: 10px;">查询</Button>
          <Button type="primary" icon="ios-add" @click="toAddModel" style="margin-left: 10px;">发表文章</Button>
        </div>

        <Table :loading="table.loading" :columns="table.columns" :data="table.data" stripe border ref="selection" @on-delete="handleDelete" @on-select="handleSelect"></Table>
        <Page :total="query.totalRecord" show-total :pageSize="query.pageSize" @on-change="pageChange" show-sizer @on-page-size-change="pageSizeChange"
              v-show="table.operation.success"></Page>
      </card>
      <card v-else>
        {{table.operation.message}}
      </card>


    <Modal :title="title" v-model="modal.showModal" :mask-closable="false" :width="80" :fullscreen="true">

      <p slot="header">
        <Icon type="ios-information-circle"></Icon>
        <span> {{ modal.title }}</span>
      </p>
      <Form :model="modal.data" :label-width="100" ref="modalForm" :rules="ruleValidate">
        <FormItem label="文章标题" prop="title" :required="true">
          <i-input v-model="modal.data.title" clearable placeholder="栏目标题"></i-input>
        </FormItem>

        <FormItem label="关键字" prop="keywords">
          <i-input v-model="modal.data.keywords" clearable placeholder="关键字"></i-input>
        </FormItem>

        <FormItem label="说明" prop="description" >
          <i-input v-model="modal.data.description" clearable placeholder="说明"></i-input>
        </FormItem>


        <FormItem label="是否允许评论" prop="allowComment"  >
          <RadioGroup v-model="modal.data.allowComment" type="button">
            <Radio label="TRUE">是</Radio>
            <Radio label="FALSE">否</Radio>
          </RadioGroup>
        </FormItem>

        <FormItem label="状态" prop="status" >
          <RadioGroup v-model="modal.data.status" type="button">
            <Radio label="PUBLISH">发布</Radio>
            <Radio label="AUDIT">待审核</Radio>
          </RadioGroup>
        </FormItem>

        <FormItem label="排序号" prop="orders" >
          <InputNumber v-model="modal.data.orders" clearable placeholder="排序号"></InputNumber>
        </FormItem>

        <FormItem label="文章标签" prop="tags" >
          <Select v-model="modal.data.tagIds" filterable multiple>
            <Option v-for="tag in modal.tags" :value="tag.id" :key="tag.name">{{ tag.name }}</Option>
          </Select>
        </FormItem>

        <FormItem label="文章内容" prop="articleData.content" >
          <div class="edit_container" id="editor">
            <quill-editor
              v-model="modal.data.articleData.content"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur" @focus="onEditorFocus"
              @change="onEditorChange" @ready="onEditorReady">
            </quill-editor>
          </div>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" size="large" long :loading="loading" @click="addOrUpdate">保存</Button>
      </div>
    </Modal>

      <Modal :title="title" v-model="linkImageModal.showModal" :mask-closable="false" :width="400"  @on-ok="handleInsertImage">

        <p slot="header">
          <Icon type="ios-information-circle"></Icon>
          <span>插入图片链接</span>
        </p>

        <Form ref="formInline" :model="linkImageModal.data" inline >
          <FormItem prop="user">
            <Input type="text" v-model="linkImageModal.data.url" placeholder="图片URL" style="width: 300px;">
              <Icon type="ios-images" slot="prepend"/>
            </Input>
          </FormItem>
        </Form>
      </Modal>

    </Col>
  </Row>
</template>
<script>
  import linkApi from '@/api/link'
  import Tree from "iview/src/components/tree/tree";
  import categoryApi from '@/api/category'
  import articleApi from '@/api/article'
  import tagApi from '@/api/tag'

  var quill = new Quill('#editor', {
    modules: {
      counter: true
    }
  });
  export default {
    components: {Tree},
    data() {
      const validateName = (rule, value, callback) => {
        if (value) {
          var pattern = new RegExp("[~'!@#￥$%^&*()-+=:?><{}]");
          if (pattern.test(value)) {
            return callback(new Error('不允许含有特殊字符'));
          }
          callback();
        } else {
          callback();
        }
      };

      return {
        editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image','linkImage', 'video']
            ],
            history: {
              delay: 1000,
              maxStack: 50,
              userOnly: false
            },
            imageDrop: true,
            imageResize: {
              displayStyles: {
                backgroundColor: 'black',
                border: 'none',
                color: 'white'
              },
              modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
            },
            handlers: {
              'linkImage': function (value) {
                console.info(value);
              }
            }
          }
        },
        query: {
          title: '',
          categoryId: 0,
          totalRecord: 0,
          pageSize: 10,
          pageNumber: 1
        },
        table: {
          loading: false,
          columns: [
            {
              type: 'selection',
              width: 60,
              align: 'center'
            },
            {title: '标题', key: 'title'},
            {title: '关键字', key: 'keywords'},
            {title: '状态', key: 'status'},
            {title: '阅读量', key: 'hits'},
            {title: '排序号', key: 'orders'},
            {
              title: '操作',
              key: 'handle',
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.toEditModel(params.index);
                      }
                    }
                  }, '修改'),
                  h('Button', {
                    props: {
                      type: 'warning',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.handleDelete(params.index);
                      }
                    }
                  }, '删除'),
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.handleFlushDelete(params.index);
                      }
                    }
                  }, '彻底删除')
                ]);
              }
            }
          ],
          data: [],
          operation: {
            success: true,
            message: ""
          }
        },
        totalRecord: 0,
        pageSize: 15,
        pageNum: 1,

        linkImageModal: {
          showModal: false,
          data:{
            url: ''
          }
        },

        categoryTree: {
          data: [],
          operation: {
            success: true,
            message: ""
          }
        },

        modal:{
          title: '',
          showModal: false,
          data: {
            id: 0,
            title: '',
            frontCover: '',
            keywords: '',
            orders: 0,
            description: '',
            status: 'PUBLISH',
            allowComment: 'TRUE',
            category:{
              id: 0
            },
            tagIds: [],
            articleData:{
              content: ''
            }
          },
          tags: []
        },

        ruleValidate: {
          title: [
            {required: true, message: '链接名称不能为空', trigger: 'blur'},
            {validator: validateName, trigger: 'blur'}
          ],
          url: [
            {required: true, message: 'URL不能为空', trigger: 'blur'},
            {validator: validateName, trigger: 'blur'},
          ]
        },

        loading: false
      }
    },
    created() {
      this.init();
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill;
      },
    },

    methods: {
      initEditor(){
        let self = this;

        const linkImageButton = document.querySelector('.ql-linkImage');
        console.info("linkImageButton:" + linkImageButton);
        linkImageButton.innerHTML = "<i class=\"ivu-icon ivu-icon-ios-images\"></i>";
        linkImageButton.addEventListener("click",function () {
          self.linkImageModal.showModal = true;
          self.linkImageModal.data.url = '';
        });
      },

      handleInsertImage(){
        console.log("log clicked ok");
        console.info("handleInsertImage");
        if(this.linkImageModal.data.url != ''){
          console.info(this.editor);
          console.info(this.$refs.myQuillEditor);
          console.info(this.$refs.myQuillEditor.getSelection());
          let quill = this.$refs.myQuillEditor.quill;
          console.info(quill);
          // 获取光标所在位置
          let length = quill.getSelection().index;
          console.info(length);
          // 插入图片
          quill.insertEmbed(length, 'image', self.linkImageModal.data.url);
          // 调整光标到最后
          quill.setSelection(length + 1);
        }

        self.linkImageModal.showModal = false;
        self.linkImageModal.data.url = '';

      },
      init(){
        // 加载栏目树
        this.searchCategoryTree();
        this.searchTags();
      },
      onEditorReady(editor) { // 准备编辑器
        console.info(editor);
        this.initEditor();
      },
      onEditorBlur(){

      }, // 失去焦点事件
      onEditorFocus(){

      }, // 获得焦点事件
      onEditorChange(){

      }, // 内容改变事件
      searchCategoryTree(){
        let self = this;
        categoryApi.getCategoryTree().then(function (res) {
          if (!res.data.success) {
            self.setTreeMessage(res.data.status.message);
          } else {
            self.categoryTree.data = res.data.data;
          }
        }).catch(function (error) {
          self.setTreeMessage(error.message);
        });
      },
      searchTags(){
        let self = this;
        tagApi.getAll().then(function (res) {
          if (res.data.success) {
            self.modal.tags = res.data.data;
          }
        }).catch(function (error) {
          self.setTableMessage(error.message);
        });
      },
      searchArticle() {
        if(this.query.categoryId == 0){
          this.$Message.error("请先选择栏目");
          return;
        }

        this.table.loading = true;
        let self = this;
        articleApi.commonSearch(this.query).then(function (res) {
          console.info(res);
          self.table.loading = false;
          if (!res.data.success) {
            self.setTableMessage(res.data.status.message);
          } else {
            self.table.data = res.data.data.datas;
            self.query.totalRecord = res.data.data.total;
            self.query.pageSize = res.data.data.pageSize;
            self.query.pageNumber = res.data.data.pageNum;

            self.table.operation.success = true;
            self.table.operation.message = '';
          }
        }).catch(function (error) {
          self.setTableMessage(error.message);
        });
      },
      handleCategoryChanged(row,event){
        this.query.categoryId = row[0].id;
        this.searchArticle();

      },
      toAddModel() {
        this.modal.title = '发表文章';
        this.modal.showModal = true;
        this.modal.data = {
          id: 0,
          title: '',
          frontCover: '',
          keywords: '',
          orders: 0,
          description: '',
          status: 'PUBLISH',
          allowComment: 'TRUE',
          category:{
            id: this.query.categoryId
          },
          tagIds: [],
          articleData:{
            content: ''
          }
        };
        this.initEditor();
      },

      toEditModel(index) {
        this.modal.title = '修改链接';
        this.modal.showModal = true;
        this.modal.data = {
          id: 0,
          title: '',
          frontCover: '',
          keywords: '',
          orders: 0,
          description: '',
          status: 'PUBLISH',
          allowComment: 'TRUE',
          category:{
            id: this.query.categoryId
          },
          tagIds: [],
          articleData:{
            content: ''
          }
        };
        this.initEditor();
        let self = this;
        articleApi.getById(this.table.data[index].id).then(function (res) {
          let result = res.data;
          if(result.success){
            self.modal.data.id = result.data.id;
            self.modal.data.title = result.data.title;
            self.modal.data.frontCover = result.data.frontCover;
            self.modal.data.keywords = result.data.keywords;
            self.modal.data.orders = result.data.orders;
            self.modal.data.description = result.data.description;
            self.modal.data.status = result.data.status;
            self.modal.data.allowComment = result.data.allowComment;
            self.modal.data.category.id = result.data.category.id;
            self.modal.data.tagIds = result.data.tagIds;
            self.modal.data.articleData.content = result.data.articleData.content;
          }else{
            self.$Message.error(result.status.message);
          }
        }).catch(function (error) {
          self.$Message.error(error.message);
        });
      },
      setTableMessage(message) {
        this.table.operation.success = false;
        this.table.operation.message = message;
      },
      setTreeMessage(message) {
        this.categoryTree.operation.success = false;
        this.categoryTree.operation.message = message;
      },
      addOrUpdate() {
        let self = this;
        this.$refs.modalForm.validate((valid) => {
          if (valid) {
            articleApi.addOrUpdate(this.modal.data).then(function (res) {
              let result = res.data;
              if (result.success) {
                self.$Message.info("添加成功");
                self.searchArticle();
              } else {
                self.$Message.error(result.status.message);
              }
            }).catch(function (error) {
              self.$Message.error(error.message);
            });
            self.loading = false;
            self.modal.showModal = false;

          } else {
            self.loading = false;
          }
        })
      },
      handleDelete (index) {
        let self = this;
        this.$Modal.confirm({
          title: '确定要删除这条记录吗？',
          onOk: () => {
            articleApi.delete(this.table.data[index].id).then(function (res) {
              let result = res.data;
              if(result.success){
                self.$Message.info('删除成功');
                self.searchArticle();
              }else {
                self.$Message.error('删除失败');
              }
            });
          }
        });
      },

      handleFlushDelete (index) {
        let self = this;
        this.$Modal.confirm({
          title: '删除后不能恢复，确定删除吗？',
          onOk: () => {
            articleApi.flushDelete(this.table.data[index].id).then(function (res) {
              let result = res.data;
              if(result.success){
                self.$Message.info('删除成功');
                self.searchArticle();
              }else {
                self.$Message.error('删除失败');
              }
            });
          }
        });
      },

      handleSelect(selection,row){
        console.info(selection);
        console.info(this.$refs.selection.getSelection());
      },
      pageChange(pageNum){
        this.query.pageNumber = pageNum;
        this.searchArticle();
      },
      pageSizeChange(pageSize){
        this.query.pageSize = pageSize;
        this.searchArticle();
      },
    }
  }
</script>

<style lang="less">
  .ivu-page {
    margin-top: 10px;
  }
</style>
