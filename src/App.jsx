import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import Option from "./components/Option";

// interface Passenger {
//   _id: string;
//   name: string;
// }

const MySelect = () => {
  //   const loadOptions = async (
  //     searchInput: string,
  //     prevOptions: OptionsOrGroups<Passenger, GroupBase<Passenger>>,
  //     { page }: { page: number }
  //   ) => {
  //     const response = await fetch(
  //       `https://api.instantwebtools.net/v1/passenger?page=${page}&size=10`
  //     );
  //     const data = await response.json();
  //     console.log(data);

  //     return {
  //       options: data.data.map((passenger: Passenger) => ({
  //         value: passenger._id,
  //         label: passenger.name,
  //       })),
  //       hasMore: data.totalPages > page,
  //       additional: {
  //         page: page + 1,
  //       },
  //     };
  //   };

  // OptionsOrGroups<Passenger, GroupBase<Passenger>>

  const [value, setValue] = useState(null);

  async function loadOptions(search, loadedOptions, { page }) {
    console.log("running");
    const response = await fetch(
      `https://api.instantwebtools.net/v1/passenger?page=${page}&size=10`
    );
    const data = await response.json();
    console.log(data.data);
    return {
      options: data.data.map((passenger) => ({
        value: passenger._id,
        label: passenger.name,
      })),
      hasMore: data.totalPages > page,
      additional: {
        page: page + 1,
      },
    };
  }

  return (
    <AsyncPaginate
      value={value}
      loadOptions={loadOptions}
      isClearable
      placeholder="Select a passenger"
      additional={{
        page: 0,
      }}
      components={{Option}}
      onChange={setValue}
      styles={{
        option: (baseStyles, state) => ({
          ...baseStyles,
          borderColor: state.isFocused ? 'grey' : 'red',
          color:"red",
        }),
      }}
    />
  );
};

export default MySelect;
