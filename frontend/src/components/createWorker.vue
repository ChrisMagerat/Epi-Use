<template>
    <div class="page">
        <h1>Create Employee</h1>
        <el-form v-model="createForm" label-width="150px" style="width: 600px" label-position="top">
            <el-form-item label="User Name">
                <el-input placeholder="Input User Name" v-model="createForm.name" />
            </el-form-item>
            <el-form-item label="Surname">
                <el-input placeholder="Input Surname" v-model="createForm.surname" />
            </el-form-item>
            <el-form-item label="Date of Birth">
                <el-date-picker type="date" placeholder="Pick a date" v-model="createForm.DoB" style="width:100%" />
            </el-form-item>
            <el-form-item label="Employee Number">
                <el-input placeholder="Input Employee Number" v-model="createForm.eNumber" />
            </el-form-item>
            <el-form-item label="Salary">
                <el-input placeholder="Input Salary" v-model="createForm.salary" />
            </el-form-item>
            <el-form-item label="Role">
                <el-select placeholder="Select a role" v-model="createForm.role" style="width:100%">
                    <el-option label="Manager" value="Manager" />
                    <el-option label="Employee" value="Employee" />
                    <el-option label="Trainee" value="Trainee" />
                </el-select>
            </el-form-item>
            <el-form-item v-if="createForm.role == 'Employee' || createForm.role == 'Trainee'" label="Superior">
                <el-select v-model="createForm.superior" style="width:100%">
                    <el-option v-for="item in options" :key="item.uuid" :label="`${item.name} ${item.surname} - ${item.employeeNumber}`" :value="item.uuid" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="create">Create</el-button>
                <el-button>Cancel</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'createWorker',
    data() {
        return {
            createForm: {
                name: null,
                surname: null,
                DoB: null,
                eNumber: null,
                salary: null,
                role: null,
                superior: null
            },
            options: []
        }
    },
    created() {
        this.fetchSuperior()
    },
    methods: {
        fetchSuperior() {
            this.$axios.get('/superior').then(response => {
                this.options = response.data
            })
        },
        create(){
            this.$axios.post('/create', this.createForm).then(() => {
                this.$message({
                    message: 'Create Successfully',
                    type: 'success'
                })
                this.createForm = {
                    name: null,
                    surname: null,
                    DoB: null,
                    eNumber: null,
                    salary: null,
                    role: null,
                    superior: null
                }
            })
        },
    }
}
</script>