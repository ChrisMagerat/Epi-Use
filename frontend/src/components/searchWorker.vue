<template>
    <div class="page">
        <h1>Search For Employee</h1>
        <el-form label-width="150px" style="width: 600px" v-model="searchForm" label-position="top">
            <el-form-item label="Search For Employee">
                <el-input placeholder="Input Employee Number Here" v-model="searchForm.searchByEmployeeNumber" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handelSearch" style="width:100%">Search
                </el-button>
            </el-form-item>
            <el-form-item label="Search Date of Birth">
                <el-date-picker type="date" placeholder="Pick a date" v-model="searchForm.searchByDate"
                    style="width:100%" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchByDate" style="width:100%">Search by
                    Date</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handelFullView" style="width:100%">View Full
                    Structure</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleOrder" style="width:100%">Order By Salary</el-button>
            </el-form-item>
            <div>
                <el-dialog title="Ordered View" v-model="dialogFormVisible3" width="50%">
                    <div v-if="orderBySalary.total == 0">
                        <h1>No Employees</h1>
                    </div>
                    <div v-if="orderBySalary.managers.length > 0">
                        <h1>Managers</h1>
                        <table style="width: 100%; text-align: left; margin-bottom: 20px;" class="resultTable">
                            <thead>
                                <tr>
                                    <th>Employee Number</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Date of Birth</th>
                                    <th>Salary</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item) in orderBySalary.managers" :key="item.uuid">
                                    <td>{{ item.employeeNumber }}</td>
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.surname }}</td>
                                    <td>{{ item.dateOfBirth.split("T")[0] }}</td>
                                    <td>R{{ item.salary }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-if="orderBySalary.employees.length > 0">
                        <h1>Employees</h1>
                        <table style="width: 100%; text-align: left; margin-bottom: 20px;" class="resultTable">
                            <thead>
                                <tr>
                                    <th>Employee Number</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Date of Birth</th>
                                    <th>Salary</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item) in orderBySalary.employees" :key="item.uuid">
                                    <td>{{ item.employeeNumber }}</td>
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.surname }}</td>
                                    <td>{{ item.dateOfBirth.split("T")[0] }}</td>
                                    <td>R{{ item.salary }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-if="orderBySalary.trainees.length > 0">
                        <h1>Trainees</h1>
                        <table style="width: 100%; text-align: left; margin-bottom: 20px;" class="resultTable">
                            <thead>
                                <tr>
                                    <th>Employee Number</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Date of Birth</th>
                                    <th>Salary</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item) in orderBySalary.trainees" :key="item.uuid">
                                    <td>{{ item.employeeNumber }}</td>
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.surname }}</td>
                                    <td>{{ item.dateOfBirth.split("T")[0] }}</td>
                                    <td>R{{ item.salary }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </el-dialog>
            </div>
            <div>
                <el-dialog title="Full Structure" v-model="dialogFormVisible2" width="50%">
                    <el-tree :data="hierarchyData" style="margin-bottom: 20px">
                        <template #default="{ data }">
                            {{ data.name }} {{ data.surname }} - {{ data.dateOfBirth.split("T")[0] }} - R{{ data.salary
                            }}
                        </template>
                    </el-tree>
                    <span>
                        <el-button @click="dialogFormVisible2 = false">Cancel</el-button>
                        <el-button type="primary" @click="dialogFormVisible2 = false">Confirm</el-button>
                    </span>
                </el-dialog>
            </div>
        </el-form>
        <div>
            <el-dialog title="Users" v-model="dialogFormVisible" width="50%">
                <div v-if="searchResults.length > 0">
                    <table style="width: 100%; text-align: left; margin-bottom: 20px;" class="resultTable">
                        <thead>
                            <tr>
                                <th>Employee Number</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Date of Birth</th>
                                <th>Salary</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item) in searchResults" :key="item.uuid">
                                <td>{{ item.employeeNumber }}</td>
                                <td>{{ item.name }}</td>
                                <td>{{ item.surname }}</td>
                                <td>{{ item.dateOfBirth.split("T")[0] }}</td>
                                <td>R{{ item.salary }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <span>
                    <el-button @click="dialogFormVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    name: 'searchWorker',
    data() {
        return {
            searchForm: {
                searchByEmployeeNumber: null,
                searchByDate: null
            },
            searchResults: [],
            dialogFormVisible: false,
            dialogFormVisible2: false,
            dialogFormVisible3: false,
            hierarchyData: [],
            orderBySalary: {
                managers: [],
                employees: [],
                trainees: [],
                total: 0
            }
        }
    },
    methods: {
        searchByDate() {
            this.$axios.post('/searchByDate', {
                searchByDate: this.searchForm.searchByDate
            }).then(response => {
                this.searchResults = response.data;
            }).catch(error => {
                console.log(error)
            })
            this.dialogFormVisible = true;
        },
        handelSearch() {
            this.$axios.post('/search', {
                searchByEmployeeNumber: this.searchForm.searchByEmployeeNumber
            }).then(response => {
                this.searchResults = response.data;
                this.dialogFormVisible = true;
            }).catch(error => {
                console.log(error)
            })
        },
        handelFullView() {
            this.$axios.get('/hierarchy').then(response => {
                this.hierarchyData = response.data
                this.dialogFormVisible2 = true;
            })
        },
        handleOrder() {
            this.$axios.get('/orderBySalary').then(response => {
                this.orderBySalary = response.data
                this.dialogFormVisible3 = true;
            })
        }
    }
}
</script>

<style scoped>
.resultTable,
.resultTable th,
.resultTable td {
    border: 1px solid black;
    border-collapse: collapse;
}

th,
td {
    padding: 5px;
}
</style>