import { connectToMQTTBroker } from "../filtering/filter";

export default function otherpage() {
  const client = connectToMQTTBroker();
  // Import necessary modules

  return (
    <>
      {" "}
      <main>
        <div> asdas</div>new page
      </main>
    </>
  );
}
