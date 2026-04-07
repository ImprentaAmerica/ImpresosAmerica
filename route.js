import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET() {
  // 1. Verificar variables de Vercel
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  console.log('URL existe:', !!supabaseUrl)
  console.log('Key existe:', !!supabaseKey)
  
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ 
      error: '❌ Variables de Supabase no encontradas en Vercel',
      url_ok: !!supabaseUrl,
      key_ok: !!supabaseKey 
    }, { status: 500 })
  }

  // 2. Conectar Supabase
  const supabase = createClient(supabaseUrl, supabaseKey)
  
  try {
    // 3. Probar conexión con tu tabla "pedidos"
    const { data, error } = await supabase
      .from('pedidos')
      .select('id, nombre, telefono, servicio, created_at')
      .limit(5)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ 
        error: `❌ Error DB: ${error.message}`,
        table_exists: false 
      }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true,
      message: '🎉 ¡SUPABASE CONECTADO CORRECTAMENTE!',
      total_pedidos: data.length,
      ultimos_pedidos: data,
      url: supabaseUrl
    })
  } catch (e) {
    return NextResponse.json({ 
      error: `❌ Error conexión: ${e.message}` 
    }, { status: 500 })
  }
}
