<template>
    <div>
        <h1>Search For Employee</h1>
        <el-form label-width="150px" style="width: 600px" v-model="searchForm">
            <el-form-item label="Search For Employee">
                <el-input placeholder="Input Employee Number Here" v-model="searchForm.searchByEmployeeNumber" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handelSearch">Search
                </el-button>
            </el-form-item>
            <el-form-item label="Search Date of Birth">
                <el-date-picker type="date" placeholder="Pick a date" v-model="searchForm.searchByDate" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchByDate">Search by
                    Date</el-button>
            </el-form-item>
            <p>View Full Structure</p>
            <el-form-item>
                <el-button type="primary" @click="handelFullView">View Full
                    Structure</el-button>
            </el-form-item>
            <div>
                <el-dialog title="Full Structure" v-model="dialogFormVisible2" width="50%">
                    <div v-if="searchResults.length > 0">
                        <el-tree :data="treeData" :props="defealtProps" />
                    </div>
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
                    <p v-for="Employee in searchResults" :key="Employee.uuid">{{ Employee.name }} {{ Employee.surname
                    }} {{ Employee.dateOfBirth }} R{{ Employee.salary }}</p>
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
            defealtProps: {
                label: 'Parent',
                children: [
                    {
                        label: 'Child'
                    }
                ]
            },
            treeData: [{
                label: 'Parent',
                children: [{
                    label: 'Child'
                }]
            }]
        }
    },
    methods: {
        searchByDate() {
            this.$axios.post('/searchByDate', {
                searchByDate: this.searchForm.searchByDate
            }).then(response => {
                this.searchResults = response.data;
                console.log(response.data)
            }).catch(error => {
                console.log(error)
            })
            this.dialogFormVisible = true;
        },
        handelSearch() {
            this.$axios.post('/search/${this.searchForm.searchByEmployeeNumber}', {
                searchByEmployeeNumber: this.searchForm.searchByEmployeeNumber
            }).then(response => {
                this.searchResults = response.data;
                console.log(response.data)
            }).catch(error => {
                console.log(error)
            })
            this.dialogFormVisible = true;
        },
        handelFullView() {
            this.$axios.get('/workers').then(response => {
                this.searchResults = response.data
                console.log(this.searchResults)
                this.treeData = this.searchResults
            })
            this.dialogFormVisible2 = true;
        }
    }
}
</script>