import JSZip from 'jszip'
import FileSaver from "file-saver"

/**
 *
 * @class UnpackAndDownImage
 * @example
 * ```javascript
 *
 * new UnpackAndDownImage({
 *  imgSrcList: imgSrcList, // 图片资源集合
 *  onProgress(res) {
 *    
 *  },
 *  onSuccess(res) {
 * 
 *  },
 *  onError(err) {
 * 
 *  }
 * })
 *
 * ```
 */

class UnpackAndDownImage {

  constructor(option){
    const opt = {
      imgSrcList:[], // 图片资源集合
      imgBase64:[], // 图片base64集合
      imageSuffix: [], // 图片后缀
      imgName:[], // 下载后的图片名称集合
      scheduleMsg:'', // 下载进度
      errorMsg:"" , //异常信息
      onProgress: this.onProgress,
      onSuccess: this.onSuccess,
      onError: this.onError,
    }

    this.option = Object.assign({}, opt, option)

    this.start()
  }

  start(){
    let count = 0;
    
    this.option.imgSrcList.forEach((item,index)=>{
      let suffix = item.substring(item.lastIndexOf("."));
      let imgFileName = item.substring(item.lastIndexOf("/"),item.lastIndexOf("."));
      this.option.imageSuffix.push(suffix);
      this.option.imgName.push(imgFileName)
      this.getBase64(item,index).then((base64)=>{
        this.option.imgBase64.push(base64.substring(22));
        count+=1
        this.option.scheduleMsg = count + '/' + this.option.imgSrcList.length

        this.option.onProgress&&this.option.onProgress(this.option.scheduleMsg)
      }).catch(err=>{
        console.log(err)
        this.option.onError&&this.option.onError(err)
      })
    })
    this.zipSaveFile()
  }

  //传入图片路径，返回base64
  getBase64(img,index) {
    return new Promise((resolve,reject)=>{
      const image = new Image();
      image.crossOrigin = 'Anonymous';
      image.src = img;
      if(img){
        image.onload =()=>{
          return resolve(this.getBase64Image(image)) //将base64传给done上传处理
        }
        image.onerror=()=>{
          let imgIndex = index+1
          reject("第"+imgIndex+"张图片格式有问题")
        }
      }else{
        reject("转换base64失败")
      }
    })
  }

  getBase64Image(img, width, height) {
    //width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
    let canvas = document.createElement("canvas");
    canvas.width = width ? width : img.width;
    canvas.height = height ? height : img.height;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    let dataURL = canvas.toDataURL("image/jpeg", 0.9);
    return dataURL;
  }

  /** 打包并下载 */
  zipSaveFile(){
    let zip = new JSZip();
    // zip.file("readme.txt", "案件详情资料\n");
    // let img = zip.folder("images");
    setTimeout(()=>{
      if(this.option.imgSrcList.length == this.option.imgBase64.length){
        this.option.imgSrcList.forEach((imgItem,i)=>{
          // 由于组件的默认时间比中国标准时间少了8小时，故在此做了处理 start
          let timeDiff = 28800000
          let currentTime = new Date().getTime()
          let compareTime = currentTime + timeDiff
          // 由于组件的默认时间比中国标准时间少了8小时，故在此做了处理 end
          zip.file(this.option.imgName[i] + this.option.imageSuffix[i], this.option.imgBase64[i], {base64: true,date:new Date(compareTime)})
        })
        zip.generateAsync({type:"blob"}).then((content)=> {

          let fileName = String(new Date().getTime()) +'.zip'
          // see FileSaver.js
          status = saveAs(content, fileName);
          
          this.option.onSuccess&&this.option.onSuccess()

          this.option.scheduleMsg = ""
        });
      }else{
        this.zipSaveFile();
      }
   },100);
  }

  onProgress(res) {
    console.log('onProgress',
      res);
  }

  onSuccess(res) {
    console.log('onSuccess:',
      res)
  }

  onError(res) {
    console.error('onError',
      res)
  }

}

export default UnpackAndDownImage;