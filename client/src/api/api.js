import axios from 'axios';

const api =axios.create({
     baseURL: 'http://localhost:8080/api', 
})
//student api
export const insertStudent = payload => api.post('/student',payload)
export const findStudent = payload => api.post('/findStudent',payload)
export const updatePreferences = payload => api.post('/updatePreferences',payload)
export const bookclass = payload => api.post('/bookclass',payload)
export const favourite = payload => api.post('/favourite',payload)
export const findstudentbyid = payload => api.post('/findstudentbyid',payload)
export const updataFavourite = payload => api.post('/updatefavourite',payload);
//teacher api
export const insertTeacher = payload => api.post('/teacher',payload)
export const findTeacher = payload => api.post('/findTeacher',payload)
export const teacherbookclass = payload => api.post('/teacherbookclass',payload)
export const directory = payload => api.post('/directory',payload)
export const showdirectory = payload => api.post('/showdirectory',payload)
export const deleteDirectory = payload => api.post('/deleteDirectory',payload)
export const updateteacherprofile = payload => api.post('/updateteacherprofile',payload)

//serach api
export const manageSearch = payload =>api.post('/managesearch',payload)
export const getSearch = payload =>api.post('/getsearch',payload)

//class api

export const createClass = payload => api.post('/class',payload)
export const findClass = () => api.get('/findclass')
export const updateCapacity =(payload)=>api.post('/updatecapacity',payload)
export const findclassbyid = (payload)=> api.post('/findclassbyid',payload);
export const updateAsanas = (payload) => api.post('/updateasanas',payload)

//asanas api

export const createAsanas = payload => api.post('/createasanas',payload)
export const getAsanas =()=> api.get('/getasanas')
export const getAsanasById =(id)=>api.post('/getAsanasById',id)


//exporting
const apis = {
    insertStudent,
    findStudent,updateAsanas,
    insertTeacher,
    findTeacher,
    createClass,
    findClass,
    updatePreferences,
    bookclass,
    createAsanas,
    getAsanas,
    updateCapacity,
    teacherbookclass,
    getAsanasById,
    favourite,
    directory,
    showdirectory,
    deleteDirectory,
    findstudentbyid,
    updataFavourite,
    manageSearch,getSearch,findclassbyid,updateteacherprofile
}

export default apis;