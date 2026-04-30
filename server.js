const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const API_TOKEN = process.env.API_TOKEN || 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjhlODUzNjkxLWYwOTEtNDgwMS1hM2U3LThhYTAyNzFhZmU2ZiJ9.eyJpc3MiOiJodHRwczovL2FwaS5jb3plLmNuIiwiYXVkIjpbIkx4VmVyQjVEUGhGYTZLUm5UMU9BalFSN0J3aGZpRVF4Il0sImV4cCI6ODIxMDI2Njg3Njc5OSwiaWF0IjoxNzc3NDY1MDUxLCJzdWIiOiJzcGlmZmU6Ly9hcGkuY296ZS5jbi93b3JrbG9hZF9pZGVudGl0eS9pZDo3NjM0MTEzMDY3MDIxNzYyNjAwIiwic3JjIjoiaW5ib3VuZF9hdXRoX2FjY2Vzc190b2tlbl9pZDo3NjM0MTU0MjY1MTAzMDQwNTUzIn0.hdI7-ve_DNX_1t1HJj3OaV6panx1MjOE0FCW2MthH1B5BlKUiQDb_xor4OO9RHbW3XXeCTJ8KriSNLnFdJYKjoZ7elQWkCyF0Py8H5UlW717_S7ypkHH95HLH6WFjhzxlasNh_Q1TrN3TY_xVl7kOCIXPLykZ4mb8BINgCBexbb5lPyg8U30ZglSzGv4rseKihN8r7ZwMb6NrcdD-qG1jXZiVqmTA29doHh1B31OlRCSAxDLK6oaSvbH3WlP5lr5t74vymh5srustSwVt49R8SaZzZ-cUIJbrRHFpLlIk4Iu6Au0UF4Ov_BykNiDNsHR1JaJBXcsT5JskhbuQGpzkg';

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/api/generate', async (req, res) => {
    try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch('https://x52xvt6v5f.coze.site/stream_run', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_TOKEN}`,
                'Accept': 'text/event-stream'
            },
            body: JSON.stringify({
                content: {
                    query: {
                        prompt: [
                            {
                                type: 'text',
                                content: {
                                    text: req.body.text
                                }
                            }
                        ]
                    }
                },
                type: 'query',
                session_id: 's' + Date.now(),
                project_id: 7634109915426029583
            })
        });

        if (!response.ok) {
            res.status(response.status).json({ error: 'API请求失败' });
            return;
        }

        const responseText = await response.text();
        let result = '';
        const events = responseText.split('\n\n');
        
        for (const event of events) {
            if (!event.trim()) continue;
            const dataMatch = event.match(/data:\s*({.*})/);
            if (dataMatch) {
                try {
                    const data = JSON.parse(dataMatch[1]);
                    if (data.type === 'answer' && data.content?.answer) {
                        result += data.content.answer;
                    }
                } catch (e) {}
            }
        }

        res.json({ success: true, content: result || '未能获取到文案' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log('================================');
    console.log('🚀 服务器运行成功！');
    console.log(`📍 主页: http://localhost:${PORT}/`);
    console.log('================================');
});
