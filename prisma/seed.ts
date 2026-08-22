import { PrismaClient, ItemType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de datos para VidaLoca MMORPG...');

  const territoriesData = [
    { name: 'Centro Madrid', city: 'Madrid', incomeRate: 500.0 },
    { name: 'Malasaña', city: 'Madrid', incomeRate: 450.0 },
    { name: 'Salamanca', city: 'Madrid', incomeRate: 700.0 },
    { name: 'Las Ramblas', city: 'Barcelona', incomeRate: 600.0 },
    { name: 'Barrio Gótico', city: 'Barcelona', incomeRate: 500.0 },
    { name: 'Marbella Centro', city: 'Marbella', incomeRate: 800.0 },
    { name: 'Puerto Banús', city: 'Marbella', incomeRate: 900.0 },
    { name: 'Casco Antiguo Sevilla', city: 'Sevilla', incomeRate: 450.0 },
    { name: 'Ciudad de las Artes', city: 'Valencia', incomeRate: 520.0 },
    { name: 'Casco Viejo Bilbao', city: 'Bilbao', incomeRate: 490.0 },
  ];

  for (const t of territoriesData) {
    await prisma.territory.create({ data: t });
  }
  console.log(`✅ ${territoriesData.length} territorios creados`);

  const vehiclesData = [
    { name: 'Seat Ibiza', brand: 'SEAT', speed: 140, handling: 80, durability: 65, capacity: 5, priceEuros: 15000 },
    { name: 'Volkswagen Golf', brand: 'Volkswagen', speed: 160, handling: 82, durability: 70, capacity: 5, priceEuros: 22000 },
    { name: 'Porsche 911 Carrera', brand: 'Porsche', speed: 295, handling: 95, durability: 80, capacity: 2, priceEuros: 120000 },
    { name: 'Ferrari 488 GTB', brand: 'Ferrari', speed: 330, handling: 97, durability: 75, capacity: 2, priceEuros: 250000, priceVida: 15000 },
    { name: 'Lamborghini Huracán', brand: 'Lamborghini', speed: 325, handling: 96, durability: 78, capacity: 2, priceEuros: 240000, priceVida: 14500 },
    { name: 'Range Rover Sport', brand: 'Land Rover', speed: 220, handling: 75, durability: 85, capacity: 5, priceEuros: 85000 },
    { name: 'BMW X5', brand: 'BMW', speed: 230, handling: 78, durability: 83, capacity: 5, priceEuros: 75000 },
    { name: 'Mercedes G-Class', brand: 'Mercedes', speed: 210, handling: 70, durability: 90, capacity: 5, priceEuros: 130000, priceVida: 8000 },
    { name: 'Honda CBR600RR', brand: 'Honda', speed: 260, handling: 90, durability: 75, capacity: 1, priceEuros: 12000 },
    { name: 'Yamaha YZF-R1', brand: 'Yamaha', speed: 280, handling: 93, durability: 78, capacity: 1, priceEuros: 18000 },
    { name: 'Ducati Panigale V4', brand: 'Ducati', speed: 300, handling: 95, durability: 72, capacity: 1, priceEuros: 25000, priceVida: 3500 },
    { name: 'Seat 600', brand: 'SEAT', speed: 95, handling: 55, durability: 60, capacity: 4, priceEuros: 8000 },
    { name: 'Ford Mustang 1967', brand: 'Ford', speed: 180, handling: 60, durability: 75, capacity: 4, priceEuros: 45000 },
    { name: 'Armored BMW 7 Series', brand: 'BMW', speed: 210, handling: 72, durability: 100, capacity: 4, priceEuros: 180000, priceVida: 12000 },
  ];

  for (const v of vehiclesData) {
    await prisma.vehicleTemplate.create({ data: v });
  }
  console.log(`✅ ${vehiclesData.length} vehículos creados`);

  const itemsData = [
    { name: 'Puños', description: 'Tus propias manos', type: ItemType.WEAPON, rarity: 'COMMON', priceEuros: 0 },
    { name: 'Navaja Española', description: 'Clásica navaja', type: ItemType.WEAPON, rarity: 'COMMON', priceEuros: 150 },
    { name: 'Bate de Béisbol', description: 'Bate de madera', type: ItemType.WEAPON, rarity: 'COMMON', priceEuros: 80 },
    { name: 'Katana', description: 'Espada japonesa', type: ItemType.WEAPON, rarity: 'RARE', priceEuros: 800 },
    { name: 'Glock 17', description: 'Pistola austriaca', type: ItemType.WEAPON, rarity: 'COMMON', priceEuros: 500 },
    { name: 'SIG Sauer P226', description: 'Pistola alemana', type: ItemType.WEAPON, rarity: 'COMMON', priceEuros: 650 },
    { name: 'Desert Eagle .50', description: 'Pistola gran calibre', type: ItemType.WEAPON, rarity: 'RARE', priceEuros: 1200 },
    { name: 'Golden Desert Eagle', description: 'Versión dorada', type: ItemType.WEAPON, rarity: 'LEGENDARY', priceVida: 2500 },
    { name: 'UMP45', description: 'Subfusil compacto', type: ItemType.WEAPON, rarity: 'COMMON', priceEuros: 1500 },
    { name: 'MP5', description: 'Subfusil legendario', type: ItemType.WEAPON, rarity: 'RARE', priceEuros: 1800 },
    { name: 'Vector .45', description: 'Subfusil alta cadencia', type: ItemType.WEAPON, rarity: 'EPIC', priceEuros: 2200 },
    { name: 'Remington 870', description: 'Escopeta bombeo', type: ItemType.WEAPON, rarity: 'COMMON', priceEuros: 800 },
    { name: 'AA-12 Automática', description: 'Escopeta automática', type: ItemType.WEAPON, rarity: 'EPIC', priceEuros: 3500 },
    { name: 'AK-47', description: 'Fusil soviético', type: ItemType.WEAPON, rarity: 'RARE', priceEuros: 2500 },
    { name: 'M4A1', description: 'Carabina americana', type: ItemType.WEAPON, rarity: 'RARE', priceEuros: 2800 },
    { name: 'SCAR-L', description: 'Fusil operaciones especiales', type: ItemType.WEAPON, rarity: 'EPIC', priceEuros: 3200 },
    { name: 'AWM', description: 'Rifle precisión británico', type: ItemType.WEAPON, rarity: 'EPIC', priceEuros: 5000 },
    { name: 'Barrett .50cal', description: 'Rifle antimaterial', type: ItemType.WEAPON, rarity: 'LEGENDARY', priceEuros: 8000 },
    { name: 'Minigun Portátil', description: 'Arma devastadora', type: ItemType.WEAPON, rarity: 'LEGENDARY', priceVida: 15000 },
    { name: 'Lanzagranadas RPG', description: 'Lanzador cohetes', type: ItemType.WEAPON, rarity: 'LEGENDARY', priceVida: 12000 },
  ];

  for (const item of itemsData) {
    await prisma.itemTemplate.create({ data: item as any });
  }
  console.log(`✅ ${itemsData.length} items/armas creados`);

  const hashedPassword = await bcrypt.hash('Admin123!', 10);
  
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@vidaloca.com',
      password: hashedPassword,
      username: 'AdminVidaLoca',
    },
  });

  const firstTerritory = await prisma.territory.findFirst();

  await prisma.player.create({
    data: {
      userId: adminUser.id,
      displayName: 'AdminVidaLoca',
      level: 100,
      xp: 500000,
      euros: 1000000,
      vidaCoins: 50000,
      locationId: firstTerritory?.id || null,
    },
  });

  console.log('✅ Usuario admin creado (email: admin@vidaloca.com, password: Admin123!)');
  console.log('\n🎉 ¡Seed completado exitosamente!');
  console.log('📊 Resumen:');
  console.log(`   - ${territoriesData.length} territorios`);
  console.log(`   - ${vehiclesData.length} vehículos`);
  console.log(`   - ${itemsData.length} armas/items`);
  console.log('   - 1 usuario administrador\n');
}

main()
  .catch((e) => {
    console.error('❌ Error en el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
