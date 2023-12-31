// console.log('hello world')
function loadPhones(search, isShowAll) {
     fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`)
          .then((response) => response.json())
          .then((data) => displayPhones(data.data));
}

const displayPhones = (phones) => {
     // console.log(phones);
     const a = document.getElementById("phone-container");
     a.innerText = "";
     // disable show btn
     const showBtn = document.getElementById("show-btn");
     if (phones.length > 12) {
          showBtn.classList.remove("hidden");
     } else {
          showBtn.classList.add("hidden");
     }

     // console.log("sdhsjdh", isShowAll);
     // display only few numbers of phone

     phones = phones.slice(0, 12);

     phones.forEach((phone) => {
          // console.log(phone)
          const phoneCard = document.createElement("div");
          phoneCard.classList = `mb-5 p-5 card bg-base-100 shadow-xl`;
          phoneCard.innerHTML = `
          <figure><img src="${phone.image}" /></figure>
          <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
              <button onclick ="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
          </div>     
          `;
          a.appendChild(phoneCard);
          // phoneCard.innerText=''
     });

     loading(false);
};

// btn click
const handleSearch = () => {
     loadPhones(true);
     const searchField = document.getElementById("search-field");
     const searchText = searchField.value;
     // searchField.value=''
     loadPhones(searchText);
};
const handleSearch2 = () => {
     loading(true);
     const a = document.getElementById("search-field2");
     const b = a.value;
     loadPhones(b);
};

// loading btn click
const loading = (isLoading) => {
     const loadingSpinner = document.getElementById("loading-spinier");
     if (isLoading) {
          loadingSpinner.classList.remove("hidden");
     } else {
          loadingSpinner.classList.add("hidden");
     }
};
// show more btn
const handleShowBtn = () => {
     console.log("show");
     // handleSearch(true);
};

//
const handleShowDetails = async (id) => {
     // console.log('showDetails',id);
     const res = await fetch(
          `https://openapi.programming-hero.com/api/phone/${id}`
     );
     const data = await res.json();
     // console.log(data)
     const phone = data.data;

     showPhoneDetails(phone);
};
const showPhoneDetails = (phone) => {
     console.log(phone);

     const showDetail = document.getElementById("show-details-container");
      showDetail.classList =`p-5 space-y-5`
     showDetail.innerHTML = `
     <img src="${phone.image}" alt="">
     <p> Brand: ${phone.brand}</p>
     <p> Name: ${phone.name}</p>
     <p> GPS: ${phone?.others?.GPS || 'No GPS available'}</p>
     <p> Storage: ${phone.mainFeatures.storage}</p>
     <p> Display: ${phone.mainFeatures.displaySize}</p>
     <p> Performance: ${phone.mainFeatures.chipSet}</p>
     <p> Memory: ${phone.mainFeatures.memory}</p>
     
     `;
     show_details_modal.showModal();
};
// loadPhones();
// a(data)
