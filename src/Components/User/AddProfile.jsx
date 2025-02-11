import React from "react";

const AddProfile = () => {
  return (
    <section className=" w-[100%] min-h-[100vh] flex justify-center p-6">
      <article className="bg-[#53063E] w-[800px] p-4 rounded-sm">
        <header>
          <h1 className="text-[32px] text-center ">Add Profile</h1>
        </header>
        <hr className="my-4" />
        <main>
          <form action="">
            <article className="border">
              <div>
                <label htmlFor="FirstName"></label>
              </div>
              <div></div>
            </article>
          </form>
        </main>
      </article>
    </section>
  );
};

export default AddProfile;
