/* eslint-disable no-console */
import fs from "fs";

export const buildOneSignalEndpoints = async (selectedFunctions: string[]) => {
  console.log("Commencing building of routes...");
  const oneSignalAPIEndpoint = "./app/api/oneSignal";

  selectedFunctions.map((functionName) => {
    const functionEndpoint = `${oneSignalAPIEndpoint}/${functionName}`;

    try {
      console.log(`Removing directory "${functionEndpoint}"...`);
      fs.rmSync(functionEndpoint, { recursive: true, force: true });
    } catch (e) {
      console.log(
        `Removal not required. Directory "${functionEndpoint}" does not exist.`
      );
    }

    console.log(`Generating endpoints ${functionEndpoint}...`);
    fs.mkdirSync(functionEndpoint, { recursive: true });

    const functionTemplate = fs.readFileSync(
      `./submodules/notifications/oneSignal/templates/${functionName}Template.ts`
    );

    fs.writeFileSync(`${functionEndpoint}/route.ts`, functionTemplate);
    console.log(`...successfully generated`);
  });
};
