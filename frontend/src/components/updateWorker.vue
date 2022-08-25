<template>
    <div class="page">
        <h1>Update Employee</h1>
        <el-form label-width="150px" style="width: 600px" v-model="updateForm" label-position="top">
            <el-form-item label="Employee Number">
                <el-col :span="22">
                    <el-input placeholder="Input Employee Number" v-model="updateForm.employeeNumber" />
                </el-col>
                <el-col :span="2">
                    <el-button circle @click="handelSearch" style="margin-left: 10px">
                        <el-icon>
                            <Search></Search>
                        </el-icon>
                    </el-button>
                </el-col>
            </el-form-item>
            <el-form-item label="User Name">
                <el-input placeholder="Input User Name" v-model="updateForm.name" />
            </el-form-item>
            <el-form-item label="Surname">
                <el-input placeholder="Input Surname" v-model="updateForm.surname" />
            </el-form-item>
            <el-form-item label="Date of Birth">
                <el-date-picker type="date" placeholder="Pick a date" v-model="updateForm.dateOfBirth" style="width:100%" />
            </el-form-item>
            <el-form-item label="Salary">
                <el-input placeholder="Input Salary" v-model="updateForm.salary" />
            </el-form-item>
            <el-form-item label="Role" >
                <el-select placeholder="Select a role" v-model="updateForm.role" style="width:100%">
                    <el-option label="Manager" value="Manager" />
                    <el-option label="Employee" value="Employee" />
                    <el-option label="Trainee" value="Trainee" />
                </el-select>
            </el-form-item>
            <el-form-item v-if="updateForm.role == 'Employee' || updateForm.role == 'Trainee'" label="Superior">
                <el-select v-model="updateForm.superior" style="width:100%">
                    <el-option v-for="item in optionsSuperior" :key="item.uuid" :label="`${item.name} ${item.surname} - ${item.employeeNumber}`" :value="item.uuid" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handelUpdate">Update</el-button>
                <el-button>Cancel</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { Search } from '@element-plus/icons-vue'
export default {
    name: 'createWorker',
    data() {
        return {
            updateForm: {
                name: null,
                surname: null,
                dateOfBirth: null,
                employeeNumber: null,
                salary: null,
                role: null,
                superior: null
            },
            searchResults: [],
            optionsSuperior: [],
        }
    },
    components: {
        Search
    },
    created() {
        this.fetchSuperior()
    },
    methods: {
        fetchSuperior() {
            this.$axios.get('/superior').then(response => {
                this.optionsSuperior = response.data
            })
        },
        handelUpdate() {
            this.$axios.put('/update',this.updateForm).then(() => {
                this.$message({
                    message: 'Update Successfully',
                    type: 'success'
                })
            })
        },
        handelSearch() {
            this.$axios.post('/search', {
                searchByEmployeeNumber: this.updateForm.employeeNumber
            }).then(response => {
                this.updateForm = response.data[0];
            }).catch(error => {
                console.log(error)
            })
        }
    }
}
</script>