
export function formatPostData(data)
{
    let newData = new FormData();
    if (data instanceof FormData)
    {
        newData = data;
        for (let entry of data.getParts())
        {
            if (entry)
            {
                let name = entry.fieldName;
                let value = entry.string;
                value = value.replace('"', "''");
                value = value.replace("--", "- -");
                value = value.replace("#", "");
                newData.append(name,value);
                
            }
        }
    }
    return newData;
    
}