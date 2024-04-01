import axios from "axios";

export class Task2Service {
  public static readonly getTask2Data = async () => {
    const response = await axios.get(
      "https://api.publicapis.org/entries"
    );
    return response.data as {
        count: number;
        entries: {
            API: string;
            Description: string;
            Auth: string;
            HTTPS: boolean;
            Cors: string;
            Link: string;
            Category: string;
        }[];
    }
  }
}