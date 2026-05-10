const fs = require('fs');
const path = require('path');

const routes = [
    'auth', 'patient', 'hospital', 'bed', 'booking', 'doctor',
    'appointment', 'medicine', 'order', 'record', 'emergency',
    'ambulance', 'insurance', 'notification', 'ai', 'admin'
];

// Create directories
['routes', 'controllers', 'services'].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Create index.js for routes
const indexContent = `const express = require('express');
const router = express.Router();

${routes.map(r => `const ${r}Routes = require('./${r}.routes');`).join('\n')}

${routes.map(r => `router.use('/${r === 'auth' ? 'auth' : r + 's'}', ${r}Routes);`).join('\n')}

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Sanjeevni API v1 — All systems operational',
    availableRoutes: router.stack.filter(r => r.regexp).map(r => \`/api/v1\${r.regexp}\`)
  });
});

module.exports = router;
`;
fs.writeFileSync(path.join(__dirname, 'routes', 'index.js'), indexContent);

// Create scaffolds for each module
routes.forEach(route => {
    // Controller scaffold
    const controllerContent = `// ${route}.controller.js
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

// Placeholder for ${route} endpoints
exports.placeholder = asyncHandler(async (req, res) => {
  return ApiResponse.success(res, null, '${route} endpoint hit successfully');
});
`;
    fs.writeFileSync(path.join(__dirname, 'controllers', `${route}.controller.js`), controllerContent);

    // Route scaffold
    const routeContent = `const express = require('express');
const router = express.Router();
const controller = require('../controllers/${route}.controller');

// Add actual routes here later
router.get('/', controller.placeholder);

module.exports = router;
`;
    fs.writeFileSync(path.join(__dirname, 'routes', `${route}.routes.js`), routeContent);

    // Service scaffold
    const serviceContent = `// ${route}.service.js
// Business logic for ${route}
`;
    fs.writeFileSync(path.join(__dirname, 'services', `${route}.service.js`), serviceContent);
});

console.log('Scaffolding generated successfully.');
