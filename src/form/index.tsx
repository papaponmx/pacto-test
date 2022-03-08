import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface InterfaceFormValues {
  storeName: string,
  email: string,
  phoneNumber: number,
  slug:string
  storeType: string
}


export const Form = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<InterfaceFormValues>();

  const storeNameValue  = watch("storeName");

  const onSubmit = async (data: InterfaceFormValues) => {
    setIsLoading(true);

    const res = await fetch(`https://reqres.in/api/user`, {
      method: 'POST',
      body: JSON.stringify({
        "name": "morpheus",
        "job": "leader",
        "email": data.email,
      })
    })

    const updatedData = res.json()

    console.log('updatedData', updatedData)


    setIsLoading(false)
  };

  const onSlugChange = (e: any) => setValue("slug", e.target.value.trim().toLowerCase().replaceAll(' ', '-'))

  useEffect(() => {
    setValue('slug', storeNameValue?.toLowerCase().replaceAll(' ', '-'))
  }, [setValue, storeNameValue])

  return (
    <form className="FormSection" onSubmit={handleSubmit(onSubmit)}>
      <label>
          Store Name
      <input type="text" placeholder="Store name" {...register("storeName", {
        required: true,
        min: 3,
        maxLength: 80,
        validate: (value) => value.length > 3}
      )} />
      <p>
        {errors.storeName && `Your store name is less than 3 characters`}
      </p>

      </label>
      <label>
          Slug
      <input disabled type="text" placeholder="Slug" {...register("slug", {required: true, maxLength: 100})} onChange={onSlugChange} />
      </label>
      <p></p>
      <label>
          Email
      <input type="text" placeholder="Email" {...register("email", {
        required: true,
        pattern: /^\S+@\S+$/i,
        validate: (value) => {
        const emailRegex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{3}');
        return emailRegex.test(value);
        }
      })}
      />
      <p>
      {errors.email && `Your email is not valid`}
      </p>

      </label>
      <label>
          Phone Number
      <input type="tel" placeholder="Phone number" {...register("phoneNumber", {required: true, maxLength: 12})} />
      </label>
      <p>
      {errors.phoneNumber && `Phone number is required`}
      </p>


      <label>
          Store Type
      <select title="Store Type" {...register("storeType", { required: true })}>
        <option value="Taco Shop">Taco Shop</option>
        <option value=" Bar"> Bar</option>
        <option value=" Salon"> Salon</option>
        <option value=" Dark Kitchen"> Dark Kitchen</option>
      </select>
      </label>

      {
        isLoading ?
        <button type="submit" disabled>Loading...</button> :
        <input type="submit" />
      }
    </form>
  );
}