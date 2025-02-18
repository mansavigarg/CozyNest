import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // x.com/?a=1&b=2 -> to extract the info of a and b we use useSearchParams

  const navigate = useNavigate();

  // will hold all the filter options that the user will select to filter
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });

  const [priceRange, setPriceRange] = useState([0, 100]);

  // these categories can be defined in the database as well but here defining hardcore only
  const categories = ["Top Wear", "Bottom Wear"];

  const colors = [
    "Red",
    "Blue",
    "Black",
    "Yellow",
    "Gray",
    "White",
    "Pink",
    "Beige",
    "Navy",
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const materials = [
    "Cotton",
    "Wool",
    "Denim",
    "Polyester",
    "Silk",
    "Linen",
    "Viscose",
    "Fleece",
  ];

  const brands = [
    "Urban Threads",
    "Modern Fit",
    "Street Style",
    "Beach Breeze",
    "Fashionista",
    "ChicStyle",
  ];

  const genders = ["Men", "Women"];

  useEffect(() => {
    // const to convert the search params into plane objects
    const params = Object.fromEntries([...searchParams]);
    // with the above statement we can convert pararms in form of {category: "Top Wear", maxPrice:100 }
    // so if i want the category i can simply say params.category

    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 100,
    });

    setPriceRange([0, params.maxPrice || 100]);
  }, [searchParams]);

  //! function to handle filter change
  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    // console.log({name, value, checked, type});

    // to store all values from the filters in array
    let newFilters = { ...filters };

    if (type === "checkbox") {
      if (checked) {
        // to add the checked boxes to array
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        // to remove the unchecked boxes
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
      newFilters[name] = value;
    }

    setFilters(newFilters);
    // console.log(newFilters);
    updateURLParams(newFilters);
  };

  // function to update the url according to the selected filters
  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();
    //  newFilter will contain a js Object with data similar to -> 
    // {category: "Top Wear", size: ["XS","S"] , ....................}
    Object.keys(newFilters).forEach((key) => {
      if(Array.isArray(newFilters[key]) && newFilters[key].length > 0){
        params.append(key, newFilters[key].join(",")); // "XS,S" type
      }else if (newFilters[key]){
        params.append(key,newFilters[key]);
      }
    });
    setSearchParams(params)
    navigate(`?${params.toString()}`); 
                                        // ?category=Bottom+Wear&size=XS%2C
                                        // %2C -> is encoded version of comma(,)
  }

  // price range handling
  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setPriceRange([0,newPrice])
    const newFilters = {...filters, minPrice:0, maxPrice: newPrice};
    setFilters(filters);
    updateURLParams(newFilters);
  }
 
  return (
    <div className=" p-4">
      <h3 className=" text-xl font-medium text-gray-800 mb-4">Filter</h3>

      {/* Category Filter */}
      <div className=" mb-6">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">
          Category
        </label>
        {categories.map((category) => (
          <div key={category} className=" flex items-center mb-1">
            <input
              type="radio"
              name="category"
              value={category}
              onChange={handleFilterChange}
              checked={filters.category === category} // to retain the selected filters on refresh of page
              className=" mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className=" text-gray-700">{category}</span>
          </div>
        ))}
      </div>

      {/* Gender Filter */}
      <div className=" mb-6">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">
          Gender
        </label>
        {genders.map((gender) => (
          <div key={gender} className=" flex items-center mb-1">
            <input
              type="radio"
              name="gender"
              value={gender}
              onChange={handleFilterChange}
              checked={filters.gender === gender}
              className=" mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className=" text-gray-700">{gender}</span>
          </div>
        ))}
      </div>

      {/* Color section */}
      <div className=" mb-6 ">
        <label htmlFor=" " className=" block text-gray-600 font-medium mb-2 ">
          Color
        </label>
        <div className=" flex flex-wrap gap-2 ">
          {colors.map((color) => (
            <button
              key={color}
              name="color"
              value={color}
              onClick={handleFilterChange}
              className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 ${filters.color === color ? "ring-2 ring-blue-500": "" }`}
              style={{ backgroundColor: color.toLowerCase() }}
            ></button>
          ))}
        </div>
      </div>

      {/* Size filter */}
      <div className=" mb-6 ">
        <label htmlFor="" className=" block text-gray-600 font-medium mb-2 ">
          Size
        </label>
        {sizes.map((size) => (
          <div key={size} className=" flex items-center mb-1">
            <input
              type="checkbox"
              name="size"
              value={size}
              onChange={handleFilterChange}
              checked={filters.size.includes(size)}
              className=" mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className=" text-gray-700 ">{size}</span>
          </div>
        ))}
      </div>

      {/* Material filter */}
      <div className=" mb-6 ">
        <label className=" block text-gray-600 font-medium mb-2 ">
          Material
        </label>
        {materials.map((material) => (
          <div key={material} className=" flex items-center mb-1">
            <input
              type="checkbox"
              name="material"
              value={material}
              onChange={handleFilterChange}
              checked={filters.material.includes(material)}
              className=" mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className=" text-gray-700 ">{material}</span>
          </div>
        ))}
      </div>

      {/* Brand filter */}
      <div className=" mb-6 ">
        <label className=" block text-gray-600 font-medium mb-2 ">Brand</label>
        {brands.map((brand) => (
          <div key={brand} className=" flex items-center mb-1">
            <input
              type="checkbox"
              name="brand"
              value={brand}
              onChange={handleFilterChange}
              checked={filters.brand.includes(brand)}
              className=" mr-2 h-4 w-4 text-blue-500  focus:ring-blue-400 border-gray-300"
            />
            <span className=" text-gray-700 ">{brand}</span>
          </div>
        ))}
      </div>

      {/* Price Range Filter */}
      <div className=" mb-8">
        <label htmlFor="" className=" block text-gray-600 font-medium mb-2">
          Price Range
        </label>
        <input
          type="range"
          name="priceRange"
          min={0}
          max={100}
          value={priceRange[1]}
          onChange={handlePriceChange}
          className=" w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <div className=" flex justify-between text-gray-600 mt-2">
          <span className="">$0</span>
          <span className="">${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
