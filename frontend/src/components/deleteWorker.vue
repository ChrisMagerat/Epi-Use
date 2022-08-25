<template>
    <div class="page">
        <h1>Delete</h1>
        <el-form label-width="150px" style="width: 600px" label-position="top">
            <el-form-item label="Employee to Delete">
                <el-select v-model="deleteEmployee" style="width:100%">
                    <el-option v-for="item in deleteOptions" :key="item.uuid" :label="`${item.name} ${item.surname} - ${item.employeeNumber}`" :value="item.uuid" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handelDelete" style="width:100%">Delete</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'deleteWorker',
    data() {
        return {
            deleteEmployee: null,
            clicked: null,
            options: [],
            deleteOptions: []
        }
    },
    created() {
        this.fetchAll()
    },
    methods: {
        fetchAll(){
            this.$axios.get('/workers').then(response => {
                this.deleteOptions = response.data
            })
        },
        handelDelete(){
            this.$axios.delete(`/delete/${this.deleteEmployee}`).then(() => {
                this.$message({
                    message: 'Delete Successfully',
                    type: 'success'
                })
                this.deleteEmployee = null
            })
        }
    }
}
</script>