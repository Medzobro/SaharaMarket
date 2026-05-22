import { PrismaClient, ProductCondition, ProductStatus, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'node:crypto';

const prisma = new PrismaClient();

const categoriesData = [
  { slug: 'phones', name: 'Phones', nameAr: 'هواتف', nameFr: 'Téléphones', icon: 'smartphone', order: 1 },
  { slug: 'vehicles', name: 'Vehicles', nameAr: 'سيارات', nameFr: 'Véhicules', icon: 'car', order: 2 },
  { slug: 'real-estate', name: 'Real Estate', nameAr: 'عقارات', nameFr: 'Immobilier', icon: 'home', order: 3 },
  { slug: 'fashion', name: 'Fashion', nameAr: 'أزياء', nameFr: 'Mode', icon: 'shirt', order: 4 },
  { slug: 'furniture', name: 'Furniture', nameAr: 'أثاث', nameFr: 'Meubles', icon: 'sofa', order: 5 },
  { slug: 'electronics', name: 'Electronics', nameAr: 'إلكترونيات', nameFr: 'Électronique', icon: 'laptop', order: 6 },
  { slug: 'sports', name: 'Sports', nameAr: 'رياضة', nameFr: 'Sport', icon: 'dumbbell', order: 7 },
  { slug: 'jobs', name: 'Jobs', nameAr: 'وظائف', nameFr: 'Emplois', icon: 'briefcase', order: 8 },
];

const cities = ['Nouakchott', 'Nouadhibou', 'Rosso', 'Kaédi', 'Atar', 'Zouérat', 'Kiffa'];

async function main() {
  console.log('🌱 Seeding…');

  // Categories
  for (const c of categoriesData) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      create: c,
      update: c,
    });
  }

  // Admin
  const adminPassword = await bcrypt.hash('Admin@12345', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@saharamarket.mr' },
    update: {},
    create: {
      email: 'admin@saharamarket.mr',
      username: 'admin',
      password: adminPassword,
      role: Role.SUPER_ADMIN,
      isVerified: true,
      emailVerified: new Date(),
    },
  });
  console.log('✓ Admin:', admin.email);

  // Demo seller + store
  const sellerPassword = await bcrypt.hash('Seller@123', 12);
  const seller = await prisma.user.upsert({
    where: { email: 'demo@saharamarket.mr' },
    update: {},
    create: {
      email: 'demo@saharamarket.mr',
      username: 'sahara_electronics',
      password: sellerPassword,
      role: Role.SELLER,
      isVerified: true,
      emailVerified: new Date(),
      city: 'Nouakchott',
    },
  });

  const store = await prisma.store.upsert({
    where: { ownerId: seller.id },
    update: {},
    create: {
      ownerId: seller.id,
      slug: 'sahara-electronics',
      name: 'Sahara Electronics',
      description: 'Premium electronics retailer in Nouakchott. Authorized resellers since 2020.',
      logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400',
      coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600',
      city: 'Nouakchott',
      phone: '+222 22 22 22 22',
      isVerified: true,
      rating: 4.9,
      reviewCount: 348,
    },
  });
  console.log('✓ Store:', store.name);

  // Products
  const phoneCat = await prisma.category.findUnique({ where: { slug: 'phones' } });
  const vehicleCat = await prisma.category.findUnique({ where: { slug: 'vehicles' } });

  const productsData = [
    {
      title: 'iPhone 15 Pro Max — 256 GB Natural Titanium',
      description: 'Brand new sealed in box. Apple warranty.',
      price: 95000,
      categoryId: phoneCat!.id,
      condition: ProductCondition.NEW,
      city: 'Nouakchott',
      images: ['https://images.unsplash.com/photo-1592286927505-1def25115558?w=1600'],
    },
    {
      title: 'Toyota Land Cruiser 2018 — 4x4',
      description: 'Excellent condition, full options, low mileage.',
      price: 4_200_000,
      categoryId: vehicleCat!.id,
      condition: ProductCondition.GOOD,
      city: 'Nouadhibou',
      images: ['https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600'],
    },
  ];

  for (const p of productsData) {
    await prisma.product.create({
      data: {
        ...p,
        slug: p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 60) + '-' + randomUUID().slice(0, 6),
        sellerId: seller.id,
        storeId: store.id,
        status: ProductStatus.ACTIVE,
        currency: 'MRU',
      },
    });
  }
  console.log(`✓ Products: ${productsData.length}`);
  console.log('✅ Seed complete.');
  console.log('   Admin: admin@saharamarket.mr / Admin@12345');
  console.log('   Seller: demo@saharamarket.mr / Seller@123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
