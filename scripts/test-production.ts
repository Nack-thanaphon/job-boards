import { prisma } from '../src/lib/prisma';

async function testProduction() {
  console.log('🧪 Testing Prisma in production mode with Turso...');
  
  try {
    // Test creating a job
    console.log('📝 Creating test job...');
    const testJob = await prisma.job.create({
      data: {
        title: 'Production Test Job',
        company: 'Production Company',
        location: 'Bangkok',
        description: 'This is a production test job',
        published: true
      }
    });
    console.log('✅ Job created:', testJob);
    
    // Test fetching all jobs
    console.log('📋 Fetching all jobs...');
    const jobs = await prisma.job.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' }
    });
    console.log(`✅ Found ${jobs.length} jobs:`, jobs);
    
    console.log('🎉 Production test completed successfully!');
    
  } catch (error) {
    console.error('❌ Production test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testProduction();
