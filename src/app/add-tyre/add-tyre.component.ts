import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { getFirestore, collection, addDoc, getDocs, doc, Timestamp} from '@firebase/firestore/lite'
import { getStorage, ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import { DbService } from '../db.service';

@Component({
  selector: 'app-add-tyre',
  templateUrl: './add-tyre.component.html',
  styleUrls: ['./add-tyre.component.css']
})
export class AddTyreComponent implements OnInit {
  file: any;
  tyreList : any;
  addView = false;
  text = "Add Tyre";
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
  constructor(private db: DbService, private route: ActivatedRoute) { 
    this.fetchTyreSizes();
  }
  
 
  action: String = "";
  tyreData: any;
  // alloyId: String="";
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.action = params['action']
     if(this.action == "update"){  // Update Here
        this.addView = true;
        this.updateMode = true;
        this.text = "Update Tyre";

        const sessionData = sessionStorage.getItem("restaurant");
        this.tyreData = JSON.parse(sessionData!);

        this.tyreData.patchValue(
          {
            name: this.tyreData.Name,
            email: this.tyreData.Size
          }
        );
        
      }else{
        console.log("Do Nothing or Handle the Case");
      }
    });
    // this.route.queryParams.subscribe(params => {
    //  this.alloyId = params['id'];
     
    // });
  }
  // addRestaurant(name: string, timeToDeliver: string, ratings: string, categories: string){
  //   //this.restaurants.push(new Restaurant(name, Number(timeToDeliver), Number(ratings), categories))
  // }

  // async fetchTyreSizes(){
  //   const firestoreDB = getFirestore(this.db.app);
  //   const alloysCollection = collection(firestoreDB, 'TyreSizes');
  //   const snapshots = await getDocs(alloysCollection);

  //   this.tyreList = snapshots.docs.map(
  //     doc => {
  //         const data = doc.data();
  //         data['docId'] = doc.id;
  //         return data;
  //     }
  //   );
  // }

  async fetchTyreSizes(){
    const firestoreDB = getFirestore(this.db.app);
    const alloysCollection = collection(firestoreDB, 'TyreSizes');
    const snapshots = await getDocs(alloysCollection);
    this.tyreList = snapshots.docs.map(doc => doc.data());
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


//   deleteTyre(docID: any){
//     console.log("Delete Clicked");
//     const firestoreDB = getFirestore(this.db.app);
//     deleteDoc(doc(firestoreDB, "tyres", docID));
// }

// updateTyre(docID: any){

//   if(this.tyreForm.value.image != ""){
//     // Upload the Image
//   }

//   const firestoreDB = getFirestore(this.db.app);
//   const documentToWrite = doc(firestoreDB, 'tyres', docID);
//   const tyreData = this.tyreForm.value;
//   console.log("Updating Tyre with Data:");
//   console.log(tyreData);
  
  
//   setDoc(documentToWrite, tyreData);
// }
  

  addTyreToFirebase(){
    console.log(this.DesignForm.value);

    const dataToSave = this.DesignForm.value;
        console.log("dataToSave is: "+dataToSave);
        const firestoreDB = getFirestore(this.db.app);
        const alloyCollection = collection(firestoreDB, 'TyreSizes/'+this.DesignForm.value.Size+'/Tyres');
        addDoc(alloyCollection, dataToSave);
        console.log("Tyre Added");

        this.DesignForm.reset();
  }

  changeView(){
    this.addView = !this.addView;
    if(this.addView){
      this.text = "View Tyres";
    }else{
      this.text = "Add Tyres";
    }
  }
  
  saveDataInSession(alloy: any){
    console.log(alloy);
    sessionStorage.setItem("dishes", JSON.stringify(alloy));
    console.log("Alloy Saved in Session Storage");
  }
}