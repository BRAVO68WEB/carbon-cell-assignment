import { Context } from 'hono';
import { Task2Service } from '../services/task2.service'

export class Task2Controller {
    public static readonly fetchData = async (ctx: Context) => {
        try {
            const data = await Task2Service.getTask2Data();
            const { 
                pageNo = 1,
                perPage = 10,
                category,
                searchTerm,
                sortBy,
                sortOrder,
             } = ctx.req.query();
            let filteredData = data.entries;
            if (category) {
                filteredData = filteredData.filter((entry:{
                    API: string;
                    Description: string;
                    Auth: string;
                    HTTPS: boolean;
                    Cors: string;
                    Link: string;
                    Category: string;
                }) => entry.Category === category);
            }
            if (searchTerm) {
                filteredData = filteredData.filter((entry:{
                    API: string;
                    Description: string;
                    Auth: string;
                    HTTPS: boolean;
                    Cors: string;
                    Link: string;
                    Category: string;
                }) => entry.API.toLowerCase().includes(searchTerm.toLowerCase()));
            }
            if (sortBy) {
                filteredData = filteredData.sort((a: any, b: any) => {
                    if (sortOrder === 'asc') {
                        return a[sortBy] > b[sortBy] ? 1 : -1;
                    } else {
                        return a[sortBy] < b[sortBy] ? 1 : -1;
                    }
                });
            }
            const start = (+pageNo - 1) * +perPage;
            const end = start + +perPage;
            const paginatedData = filteredData.slice(start, end);
            
            if (paginatedData.length === 0) {
                throw new Error('No data found');
            }

            return ctx.json({
                count: paginatedData.length,
                entries: paginatedData
            });
        } catch (error) {
            if (error instanceof Error) {
                return ctx.json({ error: error.message }, 500);
            }
        }
    }
}