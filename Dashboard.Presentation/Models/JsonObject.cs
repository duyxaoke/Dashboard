using System.Collections.Generic;

namespace Dashboard.Presentation.Models
{
    public class JsonObject<T>
    {
        public int total { get; set; }
        public List<T> data { get; set; }
    }
}