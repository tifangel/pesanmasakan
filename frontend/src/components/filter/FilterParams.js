import { getCategories } from '../../resource/index';

export var distance = [
    { name: "distance", value: "0_1", label: "<1km" },
    { name: "distance", value: "1_2", label: "1-2km" },
    { name: "distance", value: "2_5", label: "2-5km" },
    { name: "distance", value: "5_Infinity", label: ">5km" },
  ];
  
export var price = [
    { name: "price", value: "price_lt20", label: "<20.000" },
    { name: "price", value: "price_20_50", label: "20.000-50.000" },
    { name: "price", value: "price_50_100", label: "50.000-100.000" },
    { name: "price", value: "price_>100", label: ">100.000" }
  ];

export var category = [
    { name: "category", value: "cat1", label: "category 1"},
    { name: "category", value: "cat2", label: "category 2"},
    { name: "category", value: "cat3", label: "category 3"}
  ]; 

export async function loadCategories(callback) {
  try {
    let response = await getCategories();
    
    if (response.status == 200) {
      return response.data.values.map((v) => {
        return { name: "category", value: v.kategori, label: v.kategori }
      });
    }
  }
  catch (e) {
    console.log(e);
    return null;
  }
}

export var day = [
    { name: "day", value: "senin", label: "Senin"},
    { name: "day", value: "selasa", label: "Selasa"},
    { name: "day", value: "rabu", label: "Rabu"},
    { name: "day", value: "kamis", label: "Kamis"},
    { name: "day", value: "jumat", label: "Jumat"},
    { name: "day", value: "sabtu", label: "Sabtu"},
    { name: "day", value: "minggu", label: "Minggu"}
  ];