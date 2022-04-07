import * as express from 'express';
import { Cat, CatType } from './app.model';

const app:express.Express = express();
const port:number = 8000;
//front -> middleware -> next() -> 해당 router이동 
app.use((req,rs,next)=>{
    console.log(req.rawHeaders[1]);
    console.log('This is logging middleWare');
    next();
});
//* json middleware
app.use(express.json());
//고양이 데이터를 모킹하는 방법
// data 모킹이란? test를 실행하기위해서 실제데이터가아닌 개발자가 필요에 의해서 만든 데이터;


//필요한 extension Better Comments
// * : 설명입니다.
// ! : 주의하세요.
// ? : 궁금합니다.
// // : 취소합니다.
// todo : 할일입니다.


출처: https://uxgjs.tistory.com/184 [UX 공작소]

//*READ 고양이 전체 데이터 다 조회 
app.get('/cats',(req,res)=>{
try{
    const cats = Cat;
    //throw new Error('db connect error');
    res.send({
        success:true,
        data:{
            cats
        }
    })
   }catch(error){
       res.status(400).send({
           success :false,
           error:error.message
       })
   }

})
//*READ 특정 고양이 데이터 조회
app.get('/cats/:id',(req,res)=>{
    try{
        const params:string = req.params.id;
        const cat = Cat.find((cat)=>{
            return cat.id == params;
        });
        //throw new Error('db connect error');
        res.send({
            success:true,
            data:{
                cat
            }
        })
       }catch(error){
           res.status(400).send({
               success :false,
               error:error.message
           })
       }
    
    })


//*CREATE 새로운 고양이 추가 api
app.post('/cats',(req,res)=>{
   try{
       const data = req.body;
       Cat.push(data);
       res.status(200).send({
        success:true,
        data:{
            Cat
        }
    })
   }catch(error){

   }
})


//아무런 endPoint를 넣었을 때 애러를 해결해주기위해서 필요한 미들웨어 
app.use((req:express.Request,res:express.Response,next:express.NextFunction)=>{
    console.log("this is error middleWare");
    res.send({error : "404 not found err"})
})


app.listen(port,() => {
    console.log(`Exapmle app listening at http://localhost:${port}`)
})
 