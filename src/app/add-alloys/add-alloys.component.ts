import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { getStorage, ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import { DbService } from '../db.service';
import { getFirestore, collection, addDoc, getDocs, doc, Timestamp} from '@firebase/firestore/lite'


@Component({
  selector: 'app-add-alloys',
  templateUrl: './add-alloys.component.html',
  styleUrls: ['./add-alloys.component.css']
})
export class AddAlloysComponent implements OnInit {
  file: any;
  alloyList : any;
  addView = false;
  text = "Add Alloy";
  updateMode = false;
  Arch:any;
  Pname:any;
  
  DesignForm = new FormGroup(
    {
      Name: new FormControl(''),
      Brand: new FormControl(''),
      Rate: new FormControl(''),
      Quantity: new FormControl(''),
      Size: new FormControl('')
    }
  );

  //restaurants = this.service.getRestaurants();

  // if the above array is suppose to be created by fetching data from Server
  // it will take time to load

  // Injection for Service in Constructor of Component
  //constructor(private service: RestaurantsService) { }
  constructor(private db: DbService) { 
    this.fetchAlloySizes();
  }
  
 
  // action: String = "";
  // restaurantData: any;
  // alloyId: String="";
  
  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //  this.alloyId = params['id'];
     
    // });
  }
  // addRestaurant(name: string, timeToDeliver: string, ratings: string, categories: string){
  //   //this.restaurants.push(new Restaurant(name, Number(timeToDeliver), Number(ratings), categories))
  // }

  async fetchAlloySizes(){
    const firestoreDB = getFirestore(this.db.app);
    const alloysCollection = collection(firestoreDB, 'Alloys');
    const snapshots = await getDocs(alloysCollection);
    this.alloyList = snapshots.docs.map(doc => doc.data());
  }
  // pickFile(event:any){
  //   this.file = event.target.files[0];
  //   console.log(this.DesignForm.value);
  //   console.log(this.file);
  // }

  // uploadImageToFirebase(){
  //     const metadata = {
  //       contentType: 'image/png',
  //     };
  //     const storageReference = getStorage();
  //     const restaurantImageReference = ref(storageReference, this.file.name);
  //     uploadBytes(restaurantImageReference, this.file, metadata).then((snapshot) => {
  //      console.log("Image Uploaded Successfully");
  //      getDownloadURL(snapshot.ref).then((downloadURL) => {
  //       console.log('File available at', downloadURL);
  //       // Save Restaurant Object in FirebaseFirestore
        
        
  //   })
  //   .catch((error) =>{
  //     console.log("Something Went Wrong");
  //   }); 
  //     });
      

      
  // }
  

  addDesignToFirebase(){
    console.log(this.DesignForm.value);

    const dataToSave = this.DesignForm.value;
        console.log("dataToSave is: "+dataToSave);
        const firestoreDB = getFirestore(this.db.app);
        const alloyCollection = collection(firestoreDB, 'Alloys/'+this.DesignForm.value.Size+'/Alloys');
        addDoc(alloyCollection, dataToSave);
        console.log("Alloy Added");

        this.DesignForm.reset();
  }
  
  changeView(){
    this.addView = !this.addView;
    if(this.addView){
      this.text = "View Alloys";
    }else{
      this.text = "Add Alloys";
    }
  }
  
//   saveDataInSession(alloy: any){
//     console.log(alloy);
//     sessionStorage.setItem("dishes", JSON.stringify(alloy));
//     console.log("Alloy Saved in Session Storage");
//   }
}