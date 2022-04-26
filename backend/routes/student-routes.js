const express = require('express')
const student = require('../controllers/student-controller')
const teacher = require('../controllers/teacher-controller')
const c = require('../controllers/class-controller')
const asanas = require('../controllers/asanas-control')
const search = require('../controllers/search-control')
const router = express.Router()

//api routes for student

router.post('/student',student.insertStudent)
router.post('/findStudent',student.findStudent)
router.post('/updatePreferences',student.updatePreferences)
router.post('/bookclass',student.bookclass)
router.post('/favourite',student.favourite)
router.post('/findstudentbyid',student.findStudentById)
router.post('/updatefavourite',student.updataFavourite)


//api routes for search

router.post('/managesearch',search.manageSearch)
router.post('/getsearch',search.getSearch)


//api routes for teachers

router.post('/teacher',teacher.insertTeacher)
router.post('/findTeacher',teacher.findTeacher)
router.post('/teacherbookclass',teacher.bookclass)
router.post('/directory',teacher.directory)
router.post('/showdirectory',teacher.findTeacherById)
router.post('/deleteDirectory',teacher.deleteDirectory)
router.post('/updateteacherprofile',teacher.updateTeacherProfile)
//api for classes

router.post('/class',c.createClass)
router.get('/findclass',c.findClass)
router.post('/updatecapacity',c.updateCapacity)
router.post('/findclassbyid',c.findClassById)
router.post('/updateasanas',c.updateAsanas)

//api for asanas

router.post('/createasanas',asanas.createAsanas)
router.get('/getasanas',asanas.getAsanas)
router.post('/getAsanasById',asanas.getAsanasById)



//exporting routes
module.exports = router
